using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MarkingSystem.API.Controllers
{
    [Route("api/rubric")]
    [ApiController]
    [Authorize]
    public class RubricController : BaseController<RubricDto>
    {
        private readonly IListService _listService;
        protected ResponseDto _response;
        public RubricController(IGenericService<RubricDto> service, IListService rubricService) : base(service)
        {
            _listService = rubricService;
            _response = new ResponseDto();
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetRubricList()
        {
            try
            {
                var result = await _listService.GetAllRubricAsync();
                //// Set flag to indicate GET operation
                //foreach (var dto in result)
                //{
                //    dto.IsGetOperation = true;
                //}
                _response.Result = result;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.Message };
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

    }
}
