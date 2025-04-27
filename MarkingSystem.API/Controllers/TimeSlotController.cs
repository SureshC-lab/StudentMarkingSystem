using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/timeslot")]
    [ApiController]
    public class TimeSlotController : BaseController<TimeSlotDto>
    {
        public TimeSlotController(IGenericService<TimeSlotDto> service) : base(service)
        {
        }
    }
}
