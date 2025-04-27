using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class TimeSlot : Common
    {
        [Key]
        public int TimeSlotId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        [DefaultValue(false)]
        public bool IsClosed { get; set; }
        public int MaxStudents { get; set; } = 2;

        public ICollection<Booking> Bookings { get; set; }
    }
}
