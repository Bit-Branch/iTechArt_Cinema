using Microsoft.AspNetCore.Mvc;
using Cinema.Application.DTO;
using Cinema.Application.Interfaces;
using Cinema.Infrastructure.Services;

namespace Cinema.Controllers
{
    [ApiController]
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