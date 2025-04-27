using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class Enrollment : Common
    {
        [Key]
        public int EnrollmentId { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public int UserId { get; set; }

        [Required]
        [ForeignKey("CourseId")]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(20)]
        public string Role { get; set; }

        public DateTime EnrolledAt { get; set; } = DateTime.Now;

        public ApplicationUser User { get; set; }
        public Course Course { get; set; }
    }
}
