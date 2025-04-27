using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class Course : Common
    {
        [Key]
        public int CourseId { get; set; }

        public string CourseName { get; set; }

        public string CourseCode { get; set; }

        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string TeacherId { get; set; }


        public ApplicationUser Teacher { get; set; }

        public ICollection<Rubric> Rubrics { get; set; }
    }
}
