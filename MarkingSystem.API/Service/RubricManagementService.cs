using AutoMapper;
using CsvHelper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.ComponentModel;
using System.Formats.Asn1;
using System.Globalization;

namespace MarkingSystem.API.Service
{
    public class RubricManagementService : IRubricManagementService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;
        private readonly UserContextHelper _userContextHelper;
        private readonly IWebHostEnvironment _env;

        public RubricManagementService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper, IWebHostEnvironment env)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
            _env = env;
        }

        public async Task<List<RubricManagementDto>> GetAllRubricsAsync()
        {
            var rubrics = await _db.Rubrics
                .Include(r => r.Criteria)
                .ToListAsync();

            return _mapper.Map<List<RubricManagementDto>>(rubrics);
        }

        public async Task DeleteRubricAsync(int rubricId)
        {
            var rubric = await _db.Rubrics.FindAsync(rubricId);
            if (rubric == null) throw new Exception("Rubric not found");

            _db.Rubrics.Remove(rubric);
            await _db.SaveChangesAsync();
        }

        public async Task<RubricManagementDto> GetRubricByIdAsync(int rubricId)
        {
            var rubric = await _db.Rubrics.Include(r => r.Criteria).FirstOrDefaultAsync(r => r.RubricId == rubricId);
            return _mapper.Map<RubricManagementDto>(rubric);
        }

        public async Task UpdateRubricAsync(int rubricId, RubricManagementDto dto)
        {
            var rubric = await _db.Rubrics.Include(r => r.Criteria).FirstOrDefaultAsync(r => r.RubricId == rubricId);
            if (rubric == null) throw new Exception("Rubric not found");

            rubric.RubricName = dto.RubricName;
            rubric.Criteria.Clear();
            rubric.Criteria = dto.Criteria.Select(c => new RubricCriteria
            {
                RubricCriteriaId = c.RubricCriteriaId,
                Description = c.Description,
                MaxScore = c.MaxScore,
                //Order = c.Order
            }).ToList();

            await _db.SaveChangesAsync();
        }

        public async Task<List<RubricManagementDto>> UploadRubricAsync(UploadRubricFileDto dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                throw new ArgumentException("File is not provided.");

            // Process the file based on its type (CSV or Excel)
            if (dto.File.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
            {
                return await ProcessCsvFile(dto);
            }
            else if (dto.File.FileName.EndsWith(".xlsx", StringComparison.OrdinalIgnoreCase) || dto.File.FileName.EndsWith(".xls", StringComparison.OrdinalIgnoreCase))
            {
                return await ProcessExcelFile(dto);
            }
            else
            {
                throw new ArgumentException("Unsupported file format. Please upload a CSV or Excel file.");
            }

        }

        private async Task<List<RubricManagementDto>> ProcessCsvFile(UploadRubricFileDto dto)
        {
            int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
            using (var streamReader = new StreamReader(dto.File.OpenReadStream()))
            using (var csv = new CsvReader(streamReader, CultureInfo.InvariantCulture))
            {
                csv.Context.RegisterClassMap<RubricCsvMap>();

                var rubricRows = csv.GetRecords<RubricCsvRow>().ToList();
                var rubricManagement = new List<Rubric>();

                foreach (var row in rubricRows)
                {
                    var rubricCriteria = new RubricCriteria
                    {
                        Description = row.CriteriaDescription,
                        MaxScore = row.MaxScore,
                        //Order = row.Order  
                        Area= row.Area
                    };
                    rubricCriteria.CreatedBy = loginUserId;
                    rubricCriteria.CreatedDate = DateTime.Now;

                    var rubric = new Rubric
                    {
                        RubricName = row.RubricName,
                        CourseId = row.CourseId,
                        Criteria = new List<RubricCriteria> { rubricCriteria }
                    };
                    rubric.CreatedBy = loginUserId;
                    rubric.CreatedDate = DateTime.Now;

                    rubricManagement.Add(rubric);
                    _db.Rubrics.Add(rubric);
                    await _db.SaveChangesAsync();
                }

                return _mapper.Map<List<RubricManagementDto>>(rubricManagement);
            }
        }


        private async Task<List<RubricManagementDto>> ProcessExcelFile(UploadRubricFileDto dto)
        {
            try
            {
                int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();

                using (var package = new ExcelPackage(dto.File.OpenReadStream()))
                {
                    ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
                    var worksheet = package.Workbook.Worksheets[0];  // Assuming data is in the first sheet
                    var rowCount = worksheet.Dimension.Rows;

                    var rubricManagement = new List<Rubric>();
                    var rubricCache = new Dictionary<string, Rubric>(); // Cache for RubricName+CourseId

                    for (int row = 2; row <= rowCount; row++)  // Skip header row
                    {
                        var rubricName = worksheet.Cells[row, 1].Text.Trim();
                        var courseId = int.Parse(worksheet.Cells[row, 2].Text);
                        var description = worksheet.Cells[row, 3].Text.Trim();
                        var area = worksheet.Cells[row, 4].Text.Trim();
                        var maxScore = int.Parse(worksheet.Cells[row, 5].Text);

                        var key = $"{rubricName}_{courseId}";

                        Rubric rubric;

                        if (!rubricCache.TryGetValue(key, out rubric))
                        {
                            // Check database if this Rubric already exists
                            rubric = await _db.Rubrics
                                              .Include(r => r.Criteria)
                                              .FirstOrDefaultAsync(r => r.RubricName == rubricName && r.CourseId == courseId);

                            if (rubric == null)
                            {
                                rubric = new Rubric
                                {
                                    RubricName = rubricName,
                                    CourseId = courseId,
                                    Criteria = new List<RubricCriteria>(),
                                    CreatedBy = loginUserId,
                                    CreatedDate = DateTime.Now
                                };

                                _db.Rubrics.Add(rubric);
                                await _db.SaveChangesAsync(); // Save to generate RubricId
                            }

                            rubricCache[key] = rubric; // Cache it
                            rubricManagement.Add(rubric); // Add to final return list only once
                        }

                        // Create and attach RubricCriteria
                        var rubricCriteria = new RubricCriteria
                        {
                            Description = description,
                            Area = area,
                            MaxScore = maxScore,
                            RubricId = rubric.RubricId,
                            CreatedBy = loginUserId,
                            CreatedDate = DateTime.Now
                        };

                        _db.RubricCriteria.Add(rubricCriteria); // Assuming separate DbSet for RubricCriteria
                        await _db.SaveChangesAsync();
                    }

                    return _mapper.Map<List<RubricManagementDto>>(rubricManagement);
                }
            }
            catch (Exception ex) { 
                
            }
            return new List<RubricManagementDto>();
        }


        private async Task<List<RubricManagementDto>> ProcessExcelFile1(UploadRubricFileDto dto)
        {
            int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
            using (var package = new ExcelPackage(dto.File.OpenReadStream()))
            {
                ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
                var worksheet = package.Workbook.Worksheets[0];  // Assuming data is in the first sheet
                var rowCount = worksheet.Dimension.Rows;

                var rubricManagement = new List<Rubric>();
                // Loop through each row
                for (int row = 2; row <= rowCount; row++)  // Assuming row 1 is the header
                {
                    // Extract data from the current row
                    var rubricName = worksheet.Cells[row, 1].Text;  // Assuming RubricName is in column 1
                    var courseId = int.Parse(worksheet.Cells[row, 2].Text);  // Assuming CourseId is in column 2
                    var description = worksheet.Cells[row, 3].Text;  // Assuming Description is in column 3
                    var area = worksheet.Cells[row, 4].Text;  // Assuming Area is in column 3
                    var maxScore = int.Parse(worksheet.Cells[row, 5].Text);  // Assuming MaxScore is in column 5
                    //var order = int.Parse(worksheet.Cells[row, 6].Text);  // Assuming Order is in column 6

                    // Create the RubricCriteria object for the current row
                    var rubricCriteria = new RubricCriteria
                    {
                        Description = description,
                        MaxScore = maxScore,
                        //Order = order
                        Area=area
                    };
                    rubricCriteria.CreatedBy = loginUserId;
                    rubricCriteria.CreatedDate = DateTime.Now;

                    // Create the Rubric object and link it with RubricCriteria
                    var rubric = new Rubric
                    {
                        RubricName = rubricName,  // Rubric name for this row
                        CourseId = courseId,  // CourseId for this row
                        Criteria = new List<RubricCriteria> { rubricCriteria }  // Add the created RubricCriteria to the Rubric
                    };
                    rubric.CreatedBy = loginUserId;
                    rubric.CreatedDate = DateTime.Now;

                    // Add the Rubric to the database
                    _db.Rubrics.Add(rubric);
                    await _db.SaveChangesAsync();  // Save Rubric and RubricCriteria to the database

                    //add rublic data to the rubricManagement(rubric object) list
                    rubricManagement.Add(rubric);

                }

                // Return the last rubric DTO after processing all rows in a list
                return _mapper.Map<List<RubricManagementDto>>(rubricManagement);  // Map to DTO for return after the last rubric
            }
        }

    }
}
