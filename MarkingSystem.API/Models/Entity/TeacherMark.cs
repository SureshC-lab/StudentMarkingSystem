using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class TeacherMark : Common
    {
        [Key]
        public int TeacherMarkId { get; set; }
        public string StudentId { get; set; }
        public int SlotId { get; set; }
        public int Score { get; set; }

        public ApplicationUser Student { get; set; }
        public TimeSlot Slot { get; set; }

    }
}
