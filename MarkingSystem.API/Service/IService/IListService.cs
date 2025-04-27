using MarkingSystem.API.Models.Dto;

namespace MarkingSystem.API.Service.IService
{
    public interface IListService
    {
        Task<IEnumerable<RubricDto>> GetAllRubricAsync();
        Task<IEnumerable<RubricCriteriaDto>> GetAllRubricCriteriaAsync();
        Task<IEnumerable<BookingDto>> GetAllBookingAsync();

    }
}
