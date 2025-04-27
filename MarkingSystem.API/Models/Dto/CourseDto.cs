using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Dto
{
    public class CourseDto
    {
        public int CourseId { get; set; }

        [Required(ErrorMessage = "Course Name is required.")]
        [MaxLength(100)]
        public string CourseName { get; set; }

        [Required(ErrorMessage = "Course Code is required.")]
        public string CourseCode { get; set; }

        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Required(ErrorMessage = "Teacher ID is required.")]
        public string TeacherId { get; set; }
    }
}
