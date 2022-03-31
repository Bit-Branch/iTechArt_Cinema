using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    public class CinemasController : ControllerBase
    {
        private readonly ICinemaService _cinemaService;

        public CinemasController(ICinemaService cinemaService)
        {
            _cinemaService = cinemaService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCinema([FromBody] CreateCinemaDto cinema)
        {
            return Ok(await _cinemaService.CreateCinemaAsync(cinema));
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
        public async Task<IActionResult> GetCinemas([FromQuery] string? term)
        {
            var cinemas = term == null
                ? await _cinemaService.GetAllAsync()
                : await _cinemaService.FindAllByTermAsync(term);

            return Ok(cinemas);
        }
    }
}