using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Service.IService;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class UtilityService : IUtilityService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;
        public UtilityService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
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
    }
}
