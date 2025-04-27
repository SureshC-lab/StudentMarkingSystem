using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class Mark : Common
    {
        [Key]
        public int MarkId { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public int StudentId { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public int MarkerId { get; set; }

        [Required]
        [ForeignKey("RubricId")]
        public int RubricId { get; set; }

        public float Score { get; set; }

        public string Comments { get; set; }

        public bool IsValid { get; set; }

        public DateTime MarkedAt { get; set; } = DateTime.Now;

        public ApplicationUser Student { get; set; }
        public ApplicationUser Marker { get; set; }
        public Rubric Rubric { get; set; }
    }
}
