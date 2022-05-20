using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

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

        [HttpPut]
        public async Task<IActionResult> UpdateMovieSessions([FromBody] UpdateMovieSessionDto[] movieSessions)
        {
            await _movieSessionService.UpdateMovieSessionsAsync(movieSessions);
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetMovieSessions([FromQuery] PaginationRequest paginationRequest)
        {
            if (paginationRequest.IsEmpty())
            {
                return Ok(await _movieSessionService.GetAllAsync());
            }

            return Ok(await _movieSessionService.GetPagedAsync(paginationRequest));
        }

        [HttpGet("Showing")]
        public async Task<IActionResult> FindAllConflicted([FromQuery] CreateMovieSessionDto[] movieSessions)
        {
            var conflicted = await _movieSessionService.FindAllConflicted(movieSessions);

            return Ok(conflicted);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMovieSession(int id)
        {
            var deletedMovieSessionId = await _movieSessionService.DeleteMovieSessionAsync(id);

            if (deletedMovieSessionId == -1)
            {
                return NotFound();
            }

            return Ok(deletedMovieSessionId);
        }
    }
}