using MarkingSystem.API.Models.Dto;

namespace MarkingSystem.API.Service.IService
{
    public interface IStudentMarkingService
    {
        Task SubmitMarkingAsync(StudentMarkingRequest request);
        Task<List<StudentMarkingGroupedResponse>> GetGroupedStudentMarkingsAsync();
    }
}
