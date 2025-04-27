using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;

namespace MarkingSystem.API.Service.IService
{
    public interface ISlotService
    {
        Task<List<TimeSlotDto>> GetAllSlotsAsync();
        Task<TimeSlotDto> GetSlotByIdAsync(int id);
        Task<TimeSlotDto> CreateSlotAsync(TimeSlotDto slotDto);
        Task<TimeSlotDto> UpdateSlotAsync(int id, TimeSlotDto updatedSlot);
        Task<bool> DeleteSlotAsync(int id);

        Task<BookingDto> BookSlotAsync(int slotId, string studentId);
        Task<List<TimeSlotDto>> GetTeacherViewAsync();
        Task<List<TimeSlotDto>> GetStudentSlotsAsync(string studentId);

        //Task<BookingDto> CreateSlotAndBookAsync(TimeSlotDto slotDto, string studentId);
        //Task<object> CreateSlotAndBookAsync(TimeSlotDto slotDto, string studentId);
        Task<object> CreateSlotAndBookAsync(TimeSlotDto slotDto);


    }
}
