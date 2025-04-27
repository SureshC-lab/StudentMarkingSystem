using MarkingSystem.API.Models.Dto;

namespace MarkingSystem.API.Service.IService
{
    public interface IRubricManagementService
    {
        Task<List<RubricManagementDto>> GetAllRubricsAsync();
        Task<List<RubricManagementDto>> UploadRubricAsync(UploadRubricFileDto dto);
        Task<RubricManagementDto> GetRubricByIdAsync(int rubricId);
        Task UpdateRubricAsync(int rubricId, RubricManagementDto dto);
        Task DeleteRubricAsync(int rubricId);
    }
}
