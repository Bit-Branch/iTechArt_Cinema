using Microsoft.AspNetCore.Mvc;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HallsController : ControllerBase
    {
        private readonly IHallService _hallService;

        public HallsController(IHallService hallService)
        {
            _hallService = hallService;
        }

        [HttpGet]
        public async Task<IActionResult> GetHallsByCinemaId([FromQuery] int cinemaId)
        {
            var halls = await _hallService.FindAllByCinemaIdAsync(cinemaId);

            if (halls == null)
            {
                return NotFound();
            }

            return Ok(halls);
        }
    }
}