using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Infrastructure.Services;
using CinemaApp.Application.DTOs.Authentication;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Constants;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtService _jwtService;

        public UsersController(IUserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("Authenticate")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticationRequestDto userForAuthentication)
        {
            var user = await _userService.AuthenticateAsync(userForAuthentication);

            if (user == null)
            {
                return Unauthorized("Email or password invalid.");
            }

            var token = _jwtService.CreateToken(user);

            return Ok(new AuthenticationResponseDto {Token = token});
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto userForRegistration)
        {
            var user = await _userService.FindUserByEmailAsync(userForRegistration.Email);

            if (user == null)
            {
                await _userService.CreateUserAsync(userForRegistration);
            }

            return Ok("Registration successful. Check your email for details."); // TODO: Implement email authentication
        }
    }
}