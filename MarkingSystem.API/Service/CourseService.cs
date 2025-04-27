using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;
        private readonly UserContextHelper _userContextHelper;

        public CourseService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
        }
        public async Task<CourseDto> CreateUpdateCourse(CourseDto courseDto)
        {
            int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
            Course course = _mapper.Map<CourseDto, Course>(courseDto);
            if (course.CourseId >= 0)
            {
                var existingCourse = await _db.Courses
                    .Where(c => c.CourseId == course.CourseId && c.DeletedDate == null)
                    .FirstOrDefaultAsync();
                if (existingCourse == null)
                    throw new Exception("Course not found");

                _db.Entry(existingCourse).CurrentValues.SetValues(course);
                existingCourse.UpdatedBy = loginUserId;
                existingCourse.UpdatedDate = DateTime.Now;
            }
            else
            {
                course.CreatedBy = loginUserId;
                course.CreatedDate = DateTime.Now;
                _db.Courses.Add(course);
            }
            await _db.SaveChangesAsync();
            return _mapper.Map<Course, CourseDto>(course);
        }

        public async Task<bool> DeleteCourse(int courseId)
        {
            int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
            try
            {
                Course course = await _db.Courses
                    .Where(c => c.CourseId == courseId && c.DeletedDate == null)
                    .FirstOrDefaultAsync();
                if (course == null)
                {
                    return false;
                }
                course.DeletedBy = loginUserId;
                course.DeletedDate = DateTime.Now;
                _db.Courses.Remove(course);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<CourseDto> GetCourseById(int courseId)
        {
            var course = await _db.Courses
                                   .Include(c => c.Teacher)
                                   .Where(c => c.CourseId == courseId && c.DeletedDate == null)
                                   .FirstOrDefaultAsync();
            return course == null ? null : _mapper.Map<CourseDto>(course);
        }

        public async Task<IEnumerable<CourseDto>> GetCourses()
        {
            var courses = await _db.Courses
                                   .Where(c => c.DeletedDate == null)
                                   .Include(c => c.Teacher)
                                   .ToListAsync();
            return _mapper.Map<List<CourseDto>>(courses);
        }
    }
}
