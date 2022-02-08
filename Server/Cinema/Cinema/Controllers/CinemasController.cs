using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Constants;

namespace CinemaApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CinemasController : ControllerBase
    {
        private readonly ICinemaService _cinemaService;

        public CinemasController(ICinemaService cinemaService)
        {
            _cinemaService = cinemaService;
        }

        [HttpPost("Create")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateCinema([FromBody] CreateCinemaDto cinema)
        {
            return Ok(await _cinemaService.CreateCinemaAsync(cinema));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCinema(int id)
        {
            var cinema = await _cinemaService.GetCinemaByIdAsync(id);

            if (cinema == null)
            {
                return NotFound();
            }

            return Ok(cinema);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCinemas()
        {
            var cinemas = await _cinemaService.GetAllAsync();

            if (cinemas == null)
            {
                return NotFound();
            }

            return Ok(cinemas);
        }
    }
}