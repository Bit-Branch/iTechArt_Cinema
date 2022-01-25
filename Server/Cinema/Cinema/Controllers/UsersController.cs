using Microsoft.AspNetCore.Mvc;
using Cinema.Application.DTO;
using Cinema.Application.Interfaces;

namespace Cinema.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IJwtService _tokenService;
        private readonly IUserService _userService;

        public UsersController(IJwtService tokenService, IUserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserCredentialsDto userForAuthentication)
        {
            var user = await _userService.AuthenticateAsync(userForAuthentication);

            if (user == null)
            {
                return Unauthorized("Email or password invalid.");
            }

            var token = _tokenService.CreateToken(user);

            return Ok(new AuthenticationResponseDto { Token = token });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserCredentialsDto userForRegistration)
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
