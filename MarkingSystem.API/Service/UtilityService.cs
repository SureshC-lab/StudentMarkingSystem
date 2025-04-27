using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class UtilityService : IUtilityService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserContextHelper _userContextHelper;
        private IMapper _mapper;
        public UtilityService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
        }
        public async Task<IEnumerable<UtilityDto>> GetTeachers()
        {
            var teachers = await (from i in _db.Users
                            join j in _db.UserRoles on i.Id equals j.UserId
                            join k in _db.Roles on j.RoleId equals k.Id
                            where k.Name=="Teacher"
                            select new UtilityDto
                            {
                                Text = i.FullName,
                                Value = i.Id
                            }).ToListAsync();
            return _mapper.Map<List<UtilityDto>>(teachers);
        }

        public async Task<IEnumerable<UtilityDto>> GetStudents()
        {
            var students = await (from i in _db.Users
                                  join j in _db.UserRoles on i.Id equals j.UserId
                                  join k in _db.Roles on j.RoleId equals k.Id
                                  where k.Name == "Student"
                                  select new UtilityDto
                                  {
                                      Text = i.FullName,
                                      Value = i.Id
                                  }).ToListAsync();
            return _mapper.Map<List<UtilityDto>>(students);
        }

        public async Task<IEnumerable<UtilityDto>> GetCurrentStudent()
        {
            List<UtilityDto> students = new List<UtilityDto>();
            var loginUser = await _userContextHelper.GetCurrentUserAsync();
            var userRole = await _userContextHelper.GetCurrentUserRole();
            if (userRole == "Admin" || userRole == "Teacher")
            {
                students = await (from i in _db.Users
                                  join j in _db.UserRoles on i.Id equals j.UserId
                                  join k in _db.Roles on j.RoleId equals k.Id
                                  where k.Name == "Student"
                                  select new UtilityDto
                                  {
                                      Text = i.FullName,
                                      Value = i.Id
                                  }).ToListAsync();
            }
            else
            {
                students = await (from i in _db.Users
                                  join j in _db.UserRoles on i.Id equals j.UserId
                                  join k in _db.Roles on j.RoleId equals k.Id
                                  where k.Name == "Student" && i.Id == loginUser
                                  select new UtilityDto
                                  {
                                      Text = i.FullName,
                                      Value = i.Id
                                  }).ToListAsync();
            }

            return _mapper.Map<List<UtilityDto>>(students);
        }
    }
}
