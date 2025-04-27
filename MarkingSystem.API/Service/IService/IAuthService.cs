using MarkingSystem.API.Models.Dto;

namespace MarkingSystem.API.Service.IService
{
    public interface IAuthService
    {
        Task<string> Register(RegistrationRequestDto registrationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> AssignRole(string email, string roleName);
        Task<bool> ChangePassword(ChangePasswordDto changePasswordDto);
    }
}
