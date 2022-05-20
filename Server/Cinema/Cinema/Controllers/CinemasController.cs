using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

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

        [HttpPut]
        public async Task<IActionResult> UpdateCinema([FromBody] UpdateCinemaDto cinema)
        {
            return Ok(await _cinemaService.UpdateCinemaAsync(cinema));
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
        public async Task<IActionResult> GetCinemas(
            [FromQuery] string? term,
            [FromQuery] PaginationRequest paginationRequest
        )
        {
            if (paginationRequest.IsEmpty())
            {
                return Ok(
                    term == null
                        ? await _cinemaService.GetAllAsync()
                        : await _cinemaService.FindAllByTermAsync(term)
                );
            }

            return Ok(await _cinemaService.GetPagedAsync(paginationRequest));
        }

        [HttpGet("{id:int}/halls")]
        public async Task<IActionResult> GetAllHallsInCinema(int id)
        {
            var cinemaHalls = await _cinemaService.GetAllHallsByCinemaIdAsync(id);

            return Ok(cinemaHalls);
        }

        [HttpGet("{id:int}/favors")]
        public async Task<IActionResult> GetAllFavorsInCinema(int id)
        {
            var cinemaFavors = await _cinemaService.GetAllCinemaFavorsByCinemaIdAsync(id);

            return Ok(cinemaFavors);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCinema(int id)
        {
            var deletedCinemaId = await _cinemaService.DeleteCinemaAsync(id);

            if (deletedCinemaId == -1)
            {
                return NotFound();
            }

            return Ok(deletedCinemaId);
        }
    }
}