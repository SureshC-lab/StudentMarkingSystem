using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class PeerAssignment : Common
    {
        [Key]
        public int PeerAssignmentId { get; set; }
        public string StudentId { get; set; }  // The student doing the marking
        public string PeerId { get; set; } // The student being marked
        public int SlotId { get; set; }

        public ApplicationUser Student { get; set; }
        public ApplicationUser Peer { get; set; }
        public TimeSlot Slot { get; set; }

        public ICollection<PeerMark> Marks { get; set; }
    }
}
