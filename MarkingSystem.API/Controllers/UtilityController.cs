using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/utility")]
    [ApiController]
    public class UtilityController : ControllerBase
    {
        protected ResponseDto _response;
        private IUtilityService _utilityService;
        public UtilityController(IUtilityService utilityService)
        {
            _utilityService = utilityService;
            this._response = new ResponseDto();
        }

        [HttpGet("getTeachers")]
        public async Task<object> GetTeachers()
        {
            try
            {
                IEnumerable<UtilityDto> utilityDtos = await _utilityService.GetTeachers();
                _response.Result = utilityDtos;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>()
                    {
                        ex.ToString()
                    };
            }
            return _response;
        }

        [HttpGet("getStudents")]
        public async Task<object> GetStudents()
        {
            try
            {
                IEnumerable<UtilityDto> utilityDtos = await _utilityService.GetStudents();
                _response.Result = utilityDtos;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>()
                    {
                        ex.ToString()
                    };
            }
            return _response;
        }

        [HttpGet("getCurrentStudents")]
        public async Task<object> GetCurrentStudent()
        {
            try
            {
                IEnumerable<UtilityDto> utilityDtos = await _utilityService.GetCurrentStudent();
                _response.Result = utilityDtos;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>()
            {
                ex.ToString()
            };
            }
            return _response;
        }
    }
}
