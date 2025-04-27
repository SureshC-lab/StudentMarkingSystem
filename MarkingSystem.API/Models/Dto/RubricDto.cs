//using MarkingSystem.API.Models.DtoConverter;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json.Serialization;

namespace MarkingSystem.API.Models.Dto
{
    //[JsonConverter(typeof(RubricDtoConverter))]
    public class RubricDto
    {
        public int RubricId { get; set; }
        public string RubricName { get; set; }
        public int CourseId { get; set; }

        //[SwaggerParameter(Description = "Course Name", Required = false)]
        public string? CourseName { get; set; }

        //[JsonIgnore] // This flag determines serialization behavior.
        //public bool IsGetOperation { get; set; }
    }
}
