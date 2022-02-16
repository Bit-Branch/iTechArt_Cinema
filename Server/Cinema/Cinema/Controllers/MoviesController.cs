using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly IImageService _imageService;

        public MoviesController(IMovieService movieService, IImageService imageService)
        {
            _movieService = movieService;
            _imageService = imageService;
        }

        [HttpPost("Create-image")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateMovieImage([FromForm] CreateMovieImageDto createImageDto)
        {
            return Ok(await _imageService.CreateImageAsync(createImageDto.Content));
        }

        [HttpPost("Create")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateMovie([FromBody] CreateMovieDto movie)
        {
            return Ok(await _movieService.CreateMovieAsync(movie));
        }

        [HttpGet("{id:int}")]
        public IActionResult GetMovie(int id)
        {
            var movie = _movieService.GetMovieById(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies([Optional] [FromQuery] string term)
        {
            var movies = term != null
                ? await _movieService.FindAllByTermAsync(term)
                : await _movieService.GetAllAsync();

            if (movies == null)
            {
                return NotFound();
            }

            return Ok(movies);
        }
    }
}