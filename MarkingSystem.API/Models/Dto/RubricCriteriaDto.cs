namespace MarkingSystem.API.Models.Dto
{
    public class RubricCriteriaDto
    {
        public int RubricCriteriaId { get; set; }
        public string Description { get; set; }
        public int MaxScore { get; set; }
        public int RubricId { get; set; }

        public string Area { get; set; }

        public string? RubricName { get; set; }
    }
}
