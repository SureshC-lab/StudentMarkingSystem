using MarkingSystem.API.Models.Dto;

namespace MarkingSystem.API.Service.IService
{
    public interface IUtilityService
    {
        Task<IEnumerable<UtilityDto>> GetTeachers();
        Task<IEnumerable<UtilityDto>> GetStudents();
    }
}
