using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class Rubric : Common
    {
        [Key]
        public int RubricId { get; set; }
        public string RubricName { get; set; }
        public int CourseId{ get; set; }
        //public string? FileName { get; set; }
        //public string? FilePath { get; set; }


        public Course Course { get; set; }

        public ICollection<RubricCriteria> Criteria { get; set; }
    }
}
