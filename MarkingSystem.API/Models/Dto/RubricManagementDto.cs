using System.Collections.Generic;
using CsvHelper.Configuration;

namespace MarkingSystem.API.Models.Dto
{
    public class RubricManagementDto
    {
        public int RubricId { get; set; }
        public string RubricName { get; set; }
        public int CourseId { get; set; }
        //public string? FileName { get; set; }
        //public string? FilePath { get; set; }
        public List<RubricCriteriaDto> Criteria { get; set; }
    }

    public class RubricCriteriaManagementDto
    {
        public int RubricCriteriaId { get; set; }
        public string Description { get; set; }
        public int MaxScore { get; set; }
        public int Order { get; set; }
    }

    public class UploadRubricFileDto
    {
        public IFormFile File { get; set; }
        //public int? CourseId { get; set; }
        //public string? RubricName { get; set; }
    }

    public class RubricCsvRow
    {
        public string RubricName { get; set; }
        public int CourseId { get; set; }
        public string CriteriaDescription { get; set; }
        public int MaxScore { get; set; }
        public string Area { get; set; }

        // Optional: Uncomment if you're using "Order" from the CSV
        // public int Order { get; set; }
    }

    public sealed class RubricCsvMap : ClassMap<RubricCsvRow>
    {
        public RubricCsvMap()
        {
            Map(m => m.RubricName).Name("RubricName");
            Map(m => m.CourseId).Name("CourseId");
            Map(m => m.CriteriaDescription).Name("CriteriaDescription");
            Map(m => m.MaxScore).Name("MaxScore");

            // Optional:
            // Map(m => m.Order).Name("Order");
        }
    }
}
