using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarkingSystem.API.Models.Entity
{
    public class Booking : Common
    {
        [Key]
        public int BookingId { get; set; }
        public string StudentId { get; set; }
        public int SlotId { get; set; }

        public ApplicationUser Student { get; set; }
        public TimeSlot Slot { get; set; }

    }
}
