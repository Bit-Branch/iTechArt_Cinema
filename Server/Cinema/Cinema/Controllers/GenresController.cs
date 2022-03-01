using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Genre;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGenre([FromBody] CreateGenreDto genreDto)
        {
            return Ok(await _genreService.CreateGenreAsync(genreDto));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _genreService.GetAllAsync();
            
            return Ok(genres);
        }
    }
}