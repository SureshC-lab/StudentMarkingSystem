using Azure;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MarkingSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TDto> : ControllerBase
        where TDto : class
    {
        private readonly IGenericService<TDto> _service;
        protected ResponseDto _response;

        public BaseController(IGenericService<TDto> service)
        {
            _service = service;
            _response = new ResponseDto();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _service.GetAllAsync();
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                if (result == null)
                {
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "Record not found" };
                    return NotFound(_response);
                }
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TDto dto)
        {
            try
            {
                var result = await _service.CreateAsync(dto);
                _response.Result = result;
                return CreatedAtAction(nameof(GetById), new { id = result }, _response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.Message };
                return BadRequest(_response);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TDto dto)
        {
            try
            {
                var result = await _service.UpdateAsync(dto);
                if (result == null)
                {
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "Update failed" };
                    return BadRequest(_response);
                }
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool success = await _service.DeleteAsync(id);
                if (!success)
                {
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "Delete failed" };
                    return BadRequest(_response);
                }
                _response.Result = success;
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
