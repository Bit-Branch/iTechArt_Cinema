using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Constants;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/movie-sessions")]
    public class MovieSessionsController : ControllerBase
    {
        private readonly IMovieSessionService _movieSessionService;

        public MovieSessionsController(IMovieSessionService movieSessionService)
        {
            _movieSessionService = movieSessionService;
        }
        
        [HttpPost("Create")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateMovieSession([FromBody] CreateMovieSessionDto movieSession)
        {
            return Ok(await _movieSessionService.CreateMovieSessionAsync(movieSession));
        }
    }
}