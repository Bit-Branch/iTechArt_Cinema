using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
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

        [HttpPost("image")]
        public async Task<IActionResult> CreateMovieImage([FromForm] CreateMovieImageDto createImageDto)
        {
            return Ok(await _imageService.CreateImageAsync(createImageDto.Content));
        }

        [HttpPut("image")]
        public async Task<IActionResult> UpdateMovieImage([FromForm] UpdateMovieImageDto updateMovieImageDto)
        {
            return Ok(await _imageService.UpdateImageAsync(updateMovieImageDto.Id, updateMovieImageDto.Content));
        }

        [HttpGet("image")]
        public async Task<IActionResult> GetMovieImage([FromQuery] long imageId)
        {
            var image = await _imageService.GetImageAsync(imageId);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] CreateMovieDto movie)
        {
            return Ok(await _movieService.CreateMovieAsync(movie));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMovie([FromBody] UpdateMovieDto movie)
        {
            return Ok(await _movieService.UpdateMovieAsync(movie));
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
        public async Task<IActionResult> GetMovies([FromQuery] string? term)
        {
            var movies = term == null
                ? await _movieService.GetAllAsync()
                : await _movieService.FindAllByTermAsync(term);

            return Ok(movies);
        }

        [HttpGet("Now-showing")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMoviesNowShowing()
        {
            var movies = await _movieService.GetAllNowShowingAsync();

            return Ok(movies);
        }

        [HttpGet("Coming-soon")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMoviesComingSoon()
        {
            var movies = await _movieService.GetAllComingSoonAsync();

            return Ok(movies);
        }

        [HttpGet("Paged")]
        public async Task<IActionResult> GetPagedMovies([FromQuery] PaginationRequest paginationRequest)
        {
            var paginatingResult = await _movieService
                .GetPagedAsync(
                    paginationRequest.Page * paginationRequest.PageSize,
                    paginationRequest.PageSize,
                    paginationRequest.Ascending,
                    paginationRequest.SortingColumn,
                    paginationRequest.SearchTerm
                );

            return Ok(paginatingResult);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var deletedMovieId = await _movieService.DeleteMovieAsync(id);

            if (deletedMovieId == 0)
            {
                return NotFound();
            }

            return Ok(deletedMovieId);
        }
    }
}