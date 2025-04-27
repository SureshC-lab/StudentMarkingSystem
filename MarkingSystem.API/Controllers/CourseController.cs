using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/course")]
    [ApiController]
    [Authorize]
    public class CourseController : BaseController<CourseDto>
    {
        public CourseController(IGenericService<CourseDto> service) : base(service)
        {
        }
    }


    //public class CourseController : ControllerBase
    //{
    //    protected ResponseDto _response;
    //    private ICourseService _courseService;

    //    public CourseController(ICourseService courseService)
    //    {
    //        _courseService = courseService;
    //        this._response = new ResponseDto();
    //    }

    //    [HttpGet]
    //    public async Task<object> Get()
    //    {
    //        try
    //        {
    //            IEnumerable<CourseDto> courseDtos = await _courseService.GetCourses();
    //            _response.Result = courseDtos;
    //        }
    //        catch (Exception ex)
    //        {
    //            _response.IsSuccess = false;
    //            _response.ErrorMessages = new List<string>()
    //            {
    //                ex.ToString()
    //            };
    //        }
    //        return _response;
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<object> Get(int id)
    //    {
    //        try
    //        {
    //            CourseDto courseDtos = await _courseService.GetCourseById(id);
    //            _response.Result = courseDtos;
    //        }
    //        catch (Exception ex)
    //        {
    //            _response.IsSuccess = false;
    //            _response.ErrorMessages = new List<string>()
    //            {
    //                ex.ToString()
    //            };
    //        }
    //        return _response;
    //    }

    //    [HttpPost]
    //    public async Task<object> Post([FromBody] CourseDto courseDtos)
    //    {
    //        try
    //        {
    //            CourseDto model = await _courseService.CreateUpdateCourse(courseDtos);
    //            _response.Result = model;
    //        }
    //        catch (Exception ex)
    //        {
    //            _response.IsSuccess = false;
    //            _response.ErrorMessages = new List<string>()
    //            {
    //                ex.ToString()
    //            };
    //        }
    //        return _response;
    //    }

    //    [HttpPut("{id}")]
    //    public async Task<object> Put([FromBody] CourseDto courseDtos)
    //    {
    //        try
    //        {
    //            CourseDto model = await _courseService.CreateUpdateCourse(courseDtos);
    //            _response.Result = model;
    //        }
    //        catch (Exception ex)
    //        {
    //            _response.IsSuccess = false;
    //            _response.ErrorMessages = new List<string>()
    //            {
    //                ex.ToString()
    //            };
    //        }
    //        return _response;
    //    }

    //    [HttpDelete("{id}")]
    //    public async Task<object> Delete(int id)
    //    {
    //        try
    //        {
    //            bool isSuccess = await _courseService.DeleteCourse(id);
    //            _response.Result = isSuccess;
    //        }
    //        catch (Exception ex)
    //        {
    //            _response.IsSuccess = false;
    //            _response.ErrorMessages = new List<string>()
    //            {
    //                ex.ToString()
    //            };
    //        }
    //        return _response;
    //    }

    //}
}
