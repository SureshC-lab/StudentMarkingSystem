using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarkingSystem.API.Controllers
{
    [Route("api/peerassignment")]
    [ApiController]
    public class PeerAssignmentController : BaseController<PeerAssignmentDto>
    {
        private readonly IListService _listService;
        protected ResponseDto _response;
        public PeerAssignmentController(IGenericService<PeerAssignmentDto> service
            , IListService rubricService
            ) : base(service)
        {
            _listService = rubricService;
            _response = new ResponseDto();
        }
    }
}
