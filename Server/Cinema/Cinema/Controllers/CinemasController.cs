using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
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
        public IActionResult GetCinema(int id)
        {
            var cinema = _cinemaService.GetCinemaById(id);

            if (cinema == null)
            {
                return NotFound();
            }

            return Ok(cinema);
        }

        [HttpGet]
        public async Task<IActionResult> GetCinemas([Optional] [FromQuery] string term)
        {
            var cinemas = term != null
                ? await _cinemaService.FindAllByTermAsync(term)
                : await _cinemaService.GetAllAsync();

            if (cinemas == null)
            {
                return NotFound();
            }

            return Ok(cinemas);
        }
    }
}