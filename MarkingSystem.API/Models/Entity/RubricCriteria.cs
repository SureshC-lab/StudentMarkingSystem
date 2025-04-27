using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class RubricCriteria : Common
    {
        [Key]
        public int RubricCriteriaId { get; set; }
        public string Description { get; set; }
        public int MaxScore { get; set; }
        public int RubricId { get; set; }

        public string Area { get; set; }

        public Rubric Rubric { get; set; }
    }
}
