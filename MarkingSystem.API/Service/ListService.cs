using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class ListService : IListService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;
        private readonly UserContextHelper _userContextHelper;

        public ListService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
        }

        public async Task<IEnumerable<RubricDto>> GetAllRubricAsync()
        {
            var rubric = await _db.Rubrics
                                   .Where(r => r.DeletedDate == null)
                                   .Include(r => r.Course)
                                   .ToListAsync();

            //var rubricList = (from r in _db.Rubrics
            //                  join c in _db.Courses on r.CourseId equals c.CourseId
            //                  where r.DeletedDate == null
            //                  select new RubricDto
            //                  {
            //                      RubricName = r.RubricName,
            //                      CourseName = c.CourseName,
            //                  }).ToList();

            //var rubricList = await _db.Rubrics
            //                  .Where(r => r.DeletedDate == null)
            //                  .Include(r => r.Course)
            //                  .Select(r => new RubricDto
            //                  {
            //                      RubricName = r.RubricName,
            //                      CourseName = r.Course.CourseName
            //                  })
            //                  .ToListAsync();

            return _mapper.Map<List<RubricDto>>(rubric);
        }

        public async Task<IEnumerable<RubricCriteriaDto>> GetAllRubricCriteriaAsync()
        {
            var rubricCriteria = await _db.RubricCriteria
                                   .Where(c => c.DeletedDate == null)
                                   .Include(c => c.Rubric)
                                   .ToListAsync();
            return _mapper.Map<List<RubricCriteriaDto>>(rubricCriteria);
        }

        public async Task<IEnumerable<BookingDto>> GetAllBookingAsync()
        {
            var booking = await _db.Bookings
                                   .Where(b => b.DeletedDate == null)
                                   .Include(b => b.Slot)
                                   .Include(b => b.Student)
                                   .ToListAsync();
            return _mapper.Map<List<BookingDto>>(booking);
        }
    }
}
