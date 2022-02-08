using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Constants;

namespace CinemaApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpPost("Create")]
        [Authorize(Roles=Roles.Admin)]
        public async Task<IActionResult> CreateMovie([FromForm] CreateMovieDto movie)
        {
            return Ok(await _movieService.CreateMovieAsync(movie));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetMovie(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieService.GetAllAsync();

            if (movies == null)
            {
                return NotFound();
            }

            return Ok(movies);
        }
    }
}