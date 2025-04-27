using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/finalmark")]
    [ApiController]
    public class FinalMarkController : BaseController<FinalMarkDto>
    {
        private readonly IListService _listService;
        protected ResponseDto _response;
        public FinalMarkController(IGenericService<FinalMarkDto> service
            , IListService rubricService
            ) : base(service)
        {
            _listService = rubricService;
            _response = new ResponseDto();
        }
    }
}
