using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MarkingSystem.API.Controllers
{
    [Route("api/rubriccriteria")]
    [ApiController]
    [Authorize]
    public class RubricCriteriaController : BaseController<RubricCriteriaDto>
    {
        private readonly IListService _listService;
        protected ResponseDto _response;
        public RubricCriteriaController(IGenericService<RubricCriteriaDto> service
            , IListService rubricService
            ) : base(service)
        {
            _listService = rubricService;
            _response = new ResponseDto();
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetRubricCriteriaList()
        {
            try
            {
                var result = await _listService.GetAllRubricCriteriaAsync();
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
