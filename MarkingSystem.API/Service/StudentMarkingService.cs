using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class StudentMarkingService : IStudentMarkingService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;
        private readonly UserContextHelper _userContextHelper;

        public StudentMarkingService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
        }
        public async Task SubmitMarkingAsync(StudentMarkingRequest request)
        {
            string userFullName = await _userContextHelper.GetCurrentUserFullNameAsync();
            if (request == null || request.RubricScores == null || !request.RubricScores.Any())
                throw new ArgumentException("Invalid marking data.");

            var studentMarking = new StudentMarking
            {
                StudentId = request.StudentId,
                TotalMarks = request.TotalMarks,
                MarkedBy = userFullName,
                FeedbackDetails = request.RubricScores.Select(score => new StudentMarkingDetail
                {
                    RubricName = score.RubricName,
                    Score = score.Score
                }).ToList()
            };

            _db.StudentMarkings.Add(studentMarking);
            await _db.SaveChangesAsync();
        }


        public async Task<List<StudentMarkingGroupedResponse>> GetGroupedStudentMarkingsAsync()
        {
            var currentUserId = await _userContextHelper.GetCurrentUserAsync();
            var userRole = await _userContextHelper.GetCurrentUserRole();

            List<StudentMarking> studentMarkings = new List<StudentMarking>();
            if (userRole == "Admin" || userRole == "Teacher")
            {
                studentMarkings = await _db.StudentMarkings
                    .Include(sm => sm.FeedbackDetails)
                    .ToListAsync();
            }
            else if(userRole == "Student")
            {
                studentMarkings = await _db.StudentMarkings
                .Include(sm => sm.FeedbackDetails)
                .Where(sm => sm.StudentId == currentUserId)
                .ToListAsync();
            }
            else
            {
                throw new UnauthorizedAccessException("Role is not authorized to access student markings.");
            }

            //var studentMarkings = await _db.StudentMarkings
            //    .Include(sm => sm.FeedbackDetails)
            //    .ToListAsync();

            var grouped = studentMarkings
                .GroupBy(sm => sm.StudentId)
                .ToList();

            var groupedData = new List<StudentMarkingGroupedResponse>();

            foreach (var group in grouped)
            {
                var studentName = await _userContextHelper.GetNameById(group.Key); // group.Key = StudentId

                foreach (var marking in group)
                {
                    groupedData.Add(new StudentMarkingGroupedResponse
                    {
                        StudentId = studentName,
                        MarkedBy = marking.MarkedBy,
                        FeedbackDetails = marking.FeedbackDetails.Select(fd => new RubricScoreDetail
                        {
                            RubricName = fd.RubricName,
                            Score = fd.Score
                        }).ToList()
                    });
                }
            }

            return groupedData;
        }



        //public async Task<List<StudentMarkingGroupedResponse>> GetGroupedStudentMarkingsAsync()
        //{
        //    var studentMarkings = await _db.StudentMarkings
        //        .Include(sm => sm.FeedbackDetails)
        //        .ToListAsync();

        //    var groupedData = new List<StudentMarkingGroupedResponse>();

        //    foreach (var sm in studentMarkings)
        //    {
        //        var studentName = await _userContextHelper.GetNameById(sm.StudentId); // await here

        //        groupedData.Add(new StudentMarkingGroupedResponse
        //        {
        //            StudentId = studentName,
        //            MarkedBy = sm.MarkedBy,
        //            FeedbackDetails = sm.FeedbackDetails.Select(fd => new RubricScoreDetail
        //            {
        //                RubricName = fd.RubricName,
        //                Score = fd.Score
        //            }).ToList()
        //        });
        //    }

        //    return groupedData;
        //}


        //public async Task<List<StudentMarkingGroupedResponse>> GetGroupedStudentMarkingsAsync()
        //{
        //    var studentMarkings = await _db.StudentMarkings
        //        .Include(sm => sm.FeedbackDetails)
        //        .ToListAsync();

        //    var groupedData = studentMarkings.Select(sm => new StudentMarkingGroupedResponse
        //    {
        //        StudentId = sm.StudentId,
        //        MarkedBy = sm.MarkedBy,
        //        FeedbackDetails = sm.FeedbackDetails.Select(fd => new RubricScoreDetail
        //        {
        //            RubricName = fd.RubricName,
        //            Score = fd.Score
        //        }).ToList()
        //    }).ToList();

        //    return groupedData;
        //}
    }
}
