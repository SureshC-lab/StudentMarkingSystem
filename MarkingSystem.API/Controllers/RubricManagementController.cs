using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/rubricmanagement")]
    [ApiController]
    [Authorize]
    public class RubricManagementController : ControllerBase
    {
        private readonly IRubricManagementService _rubricService;

        public RubricManagementController(IRubricManagementService rubricService)
        {
            _rubricService = rubricService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadRubric([FromForm] UploadRubricFileDto dto)
        {
            var result = await _rubricService.UploadRubricAsync(dto);
            return Ok(result);
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllRubrics()
        {
            var result = await _rubricService.GetAllRubricsAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var rubric = await _rubricService.GetRubricByIdAsync(id);
            return Ok(rubric);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RubricManagementDto dto)
        {
            await _rubricService.UpdateRubricAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _rubricService.DeleteRubricAsync(id);
            return NoContent();
        }
    }
}
