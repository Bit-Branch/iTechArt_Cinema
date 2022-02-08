using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Constants;

namespace CinemaApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpPost("Create")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateGenre([FromBody] CreateGenreDto genreDto)
        {
            return Ok(await _genreService.CreateGenreAsync(genreDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _genreService.GetAllAsync();

            if (genres == null)
            {
                return NotFound();
            }

            return Ok(genres);
        }
    }
}