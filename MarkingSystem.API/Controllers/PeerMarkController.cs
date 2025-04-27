using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/peermark")]
    [ApiController]
    public class PeerMarkController : BaseController<PeerMarkDto>
    {
        private readonly IListService _listService;
        protected ResponseDto _response;
        public PeerMarkController(IGenericService<PeerMarkDto> service
            , IListService rubricService
            ) : base(service)
        {
            _listService = rubricService;
            _response = new ResponseDto();
        }
    }
}
