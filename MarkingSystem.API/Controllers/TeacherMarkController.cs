using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/teachermark")]
    [ApiController]
    public class TeacherMarkController : BaseController<TeacherMarkDto>
    {
        public TeacherMarkController(IGenericService<TeacherMarkDto> service) : base(service)
        {
        }
    }
}
