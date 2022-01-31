using System.Diagnostics;
using Cinema.Application.DTO;
using Cinema.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
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
        public async Task<IActionResult> CreateMovie([FromBody] CreateMovieDto movie)
        {
            Debug.Write(movie);
            Console.WriteLine(movie);
            return Ok(await _movieService.CreateMovieAsync(movie));
        }
    }
}