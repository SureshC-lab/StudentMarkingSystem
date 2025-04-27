using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MarkingSystem.API.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : BaseController<BookingDto>
    {
        private readonly IListService _listService;
        protected ResponseDto _response;
        public BookingController(IGenericService<BookingDto> service
            , IListService rubricService
            ) : base(service)
        {
            _listService = rubricService;
            _response = new ResponseDto();
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetBookingList()
        {
            try
            {
                var result = await _listService.GetAllBookingAsync();
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
