using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Constants;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/movie-sessions")]
    public class MovieSessionsController : ControllerBase
    {
        private readonly IMovieSessionService _movieSessionService;

        public MovieSessionsController(IMovieSessionService movieSessionService)
        {
            _movieSessionService = movieSessionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovieSessions([FromBody] CreateMovieSessionDto[] movieSessions)
        {
            await _movieSessionService.CreateMovieSessionsAsync(movieSessions);
            return Ok();
        }
    }
}