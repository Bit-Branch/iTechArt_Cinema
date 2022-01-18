
using Cinema.Service.DTO;
using Cinema.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> Authenticate([FromBody] UserCredsDto userForAuthentication)
        {
            var user = await _userService.AuthenticateAsync(userForAuthentication);

            if (user == null)
            {
                return Unauthorized(new AuthResponseDto { ErrorMessage = "User name or password invalid" });
            }

            var token = _tokenService.CreateToken(user);

            return Ok(new AuthResponseDto { Token = token });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserCredsDto userForRegistration)
        {
            var user = await _userService.FindUserByEmailAsync(userForRegistration);

            if (user != null)
            {
                return BadRequest("User with this email is already exists");
            }

            await _userService.CreateUserAsync(userForRegistration);

            return StatusCode(201, "You successfully registered, please log in with your credentials");
        }


    }
}
