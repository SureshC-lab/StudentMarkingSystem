using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace MarkingSystem.API.Service
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly UserContextHelper _userContextHelper;

        public AuthService(ApplicationDbContext db, IJwtTokenGenerator jwtTokenGenerator,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager
            , UserContextHelper userContextHelper)
        {
            _db = db;
            _jwtTokenGenerator = jwtTokenGenerator;
            _userManager = userManager;
            _roleManager = roleManager;
            _userContextHelper = userContextHelper;
        }

        public async Task<bool> AssignRole(string email, string roleName)
        {
            //var user = _db.ApplicationUsers.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                if (!_roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                {
                    //create role if it does not exist
                    _roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                }
                await _userManager.AddToRoleAsync(user, roleName);
                return true;
            }
            return false;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            //var user = _db.ApplicationUsers.FirstOrDefault(u => u.Email.ToLower() == loginRequestDto.Email.ToLower());
            var user = await _userManager.FindByEmailAsync(loginRequestDto.Email);

            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (user == null || isValid == false)
            {
                return new LoginResponseDto() { User = null, Token = "" };
            }
            //if user was found , Generate JWT Token
            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenGenerator.GenerateToken(user, roles);
            UserDto userDTO = new()
            {
                Email = user.Email,
                Id = user.Id,
                UserName = user.UserName,
            };
            LoginResponseDto loginResponseDto = new LoginResponseDto()
            {
                User = userDTO,
                Token = token
            };
            return loginResponseDto;
        }

        public async Task<string> Register(RegistrationRequestDto registrationRequestDto)
        {
            // Fetch the max UserId from the User table
            int maxUserId = await _db.Users.MaxAsync(u => (int?)u.UserId) ?? 0;
            // Increment the max value by 1 for the new UserId
            int newUserId = maxUserId + 1;
            ApplicationUser user = new()
            {
                UserName = registrationRequestDto.UserName,
                Email = registrationRequestDto.Email,
                NormalizedEmail = registrationRequestDto.Email.ToUpper(),
                EmailConfirmed = true,
                UserId = newUserId,
                FullName = registrationRequestDto.FullName,
            };
            try
            {
                user.Role = registrationRequestDto.Role;
                var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, registrationRequestDto.Role);
                    //var userToReturn = _db.ApplicationUsers.First(u => u.UserName == registrationRequestDto.UserName);
                    var userToReturn = await _userManager.FindByNameAsync(registrationRequestDto.UserName);

                    UserDto userDto = new()
                    {
                        Email = userToReturn.Email,
                        Id = userToReturn.Id,
                        UserName = userToReturn.UserName
                    };
                    return "";
                }
                else
                {
                    return result.Errors.FirstOrDefault().Description;
                }
            }
            catch (Exception ex)
            {
            }
            return "Error Encountered";
        }

        public async Task<bool> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(changePasswordDto.Email);
            if (user == null)
            {
                return false; // User not found
            }

            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            return result.Succeeded;
        }


    }
}
