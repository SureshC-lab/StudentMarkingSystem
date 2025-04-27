using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class PeerMark : Common
    {
        [Key]
        public int PeerMarkId { get; set; }
        public int PeerAssignmentId { get; set; }
        public int RubricCriteriaId { get; set; }
        public int Score { get; set; }
        public bool IsInvalidMarking { get; set; } = false;// flag for invalid marking where all 1s or 5s are given

        public PeerAssignment PeerAssignment { get; set; }
        public RubricCriteria RubricCriteria { get; set; }

    }
}
