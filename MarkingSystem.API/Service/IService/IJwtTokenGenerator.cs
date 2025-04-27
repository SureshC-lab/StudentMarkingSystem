using MarkingSystem.API.Models.Entity;

namespace MarkingSystem.API.Service.IService
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> roles);
    }
}
