//using MarkingSystem.API.Models.Dto;
//using System.Text.Json;
//using System.Text.Json.Serialization;

//namespace MarkingSystem.API.Models.DtoConverter
//{
//    public class RubricDtoConverter : JsonConverter<RubricDto>
//    {
//        public override RubricDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
//        {
//            // Default deserialization (used for POST requests)
//            return JsonSerializer.Deserialize<RubricDto>(ref reader, options);
//        }

//        public override void Write(Utf8JsonWriter writer, RubricDto value, JsonSerializerOptions options)
//        {
//            writer.WriteStartObject();

//            writer.WriteNumber("rubricId", value.RubricId);
//            writer.WriteString("rubricName", value.RubricName);

//            // If we are in a GET response, include CourseName but exclude CourseId
//            if (value.IsGetOperation)
//            {
//                writer.WriteString("courseName", value.CourseName);
//            }
//            else // In a POST request, include CourseId but exclude CourseName
//            {
//                writer.WriteNumber("courseId", value.CourseId);
//            }

//            writer.WriteEndObject();
//        }
//    }
//}
