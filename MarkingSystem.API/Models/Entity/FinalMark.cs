using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class FinalMark : Common
    {
        [Key]
        public int FinalMarkId { get; set; }
        public string StudentId { get; set; }
        public double PeerMarks { get; set; }  // Weighted (Max 4 points)
        public double TeacherMarks { get; set; }  // Weighted (Max 6 points)
        //public double FinalScore { get; set; }  // 40% Peer, 60% Teacher
        public double FinalScore
        {
            get { return (PeerMarks * 0.4) + (TeacherMarks * 0.6); }
        }

        public ApplicationUser Student { get; set; }
    }
}
