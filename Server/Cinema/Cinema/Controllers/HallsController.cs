using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Constants;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    public class HallsController : ControllerBase
    {
        private readonly IHallService _hallService;

        public HallsController(IHallService hallService)
        {
            _hallService = hallService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetHallsByCinemaId([FromQuery] int cinemaId)
        {
            var halls = await _hallService.FindAllByCinemaIdAsync(cinemaId);
            
            return Ok(halls);
        }
    }
}