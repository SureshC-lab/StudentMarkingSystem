namespace MarkingSystem.API.Models.Dto
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public string StudentId { get; set; }
        public int? SlotId { get; set; }

        public string? StudentName { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
    }
}
