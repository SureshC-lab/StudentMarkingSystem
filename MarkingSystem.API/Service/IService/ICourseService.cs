using MarkingSystem.API.Models.Dto;

namespace MarkingSystem.API.Service.IService
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetCourses();
        Task<CourseDto> GetCourseById(int courseId);
        Task<CourseDto> CreateUpdateCourse(CourseDto courseDto);
        Task<bool> DeleteCourse(int courseId);
    }
}
