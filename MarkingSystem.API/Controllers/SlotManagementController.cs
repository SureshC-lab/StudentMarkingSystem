using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/slotmanagement")]
    [ApiController]
    public class SlotManagementController : ControllerBase
    {
        private readonly ISlotService _slotService;
        public SlotManagementController(ISlotService slotService)
        {
            _slotService = slotService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var slots = await _slotService.GetAllSlotsAsync();
            return Ok(slots);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var slot = await _slotService.GetSlotByIdAsync(id);
            if (slot == null)
                return NotFound();
            return Ok(slot);
        }

        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] TimeSlotDto slotDto)
        //{
        //    var result = await _slotService.CreateSlotAsync(slotDto);
        //    return Ok(result);
        //}

        //[HttpPost]
        //public async Task<IActionResult> CreateSlotAndBookAsync([FromBody] TimeSlotDto slotDto, string studentId)
        //{
        //    var result = await _slotService.CreateSlotAndBookAsync(slotDto, studentId);
        //    return Ok(result);
        //}

        [HttpPost]
        public async Task<IActionResult> CreateSlotAndBookAsync([FromBody] TimeSlotDto slotDto)
        {
            var result = await _slotService.CreateSlotAndBookAsync(slotDto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TimeSlotDto slotDto)
        {
            var result = await _slotService.UpdateSlotAsync(id, slotDto);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _slotService.DeleteSlotAsync(id);
            if (!success)
                return NotFound();
            return NoContent();
        }

        //[HttpPost("book/{slotId}/{studentId}")]
        //public async Task<IActionResult> BookSlot(int slotId, string studentId)
        //{
        //    try
        //    {
        //        var result = await _slotService.BookSlotAsync(slotId, studentId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        [HttpGet("teacher-view")]
        public async Task<IActionResult> GetTeacherView()
        {
            var result = await _slotService.GetTeacherViewAsync();
            return Ok(result);
        }

        [HttpGet("student-view/{studentId}")]
        public async Task<IActionResult> GetStudentSlots(string studentId)
        {
            var result = await _slotService.GetStudentSlotsAsync(studentId);
            return Ok(result);
        }
    }
}
