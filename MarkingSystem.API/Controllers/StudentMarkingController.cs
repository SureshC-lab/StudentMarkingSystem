using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/studentmarking")]
    [ApiController]
    [Authorize]
    public class StudentMarkingController : ControllerBase
    {
        private readonly IStudentMarkingService _markingService;

        public StudentMarkingController(IStudentMarkingService markingService)
        {
            _markingService = markingService;
        }

        //[HttpPost("submit")]
        [HttpPost("marking")]
        public async Task<IActionResult> SubmitMarking([FromBody] StudentMarkingRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _markingService.SubmitMarkingAsync(request);
                return Ok(new { message = "Marks submitted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while submitting marks.", error = ex.Message });
            }
        }

        [HttpGet("grouped")]
        public async Task<ActionResult<List<StudentMarkingGroupedResponse>>> GetGroupedMarkings()
        {
            var result = await _markingService.GetGroupedStudentMarkingsAsync();
            return Ok(result);
        }
    }
}
