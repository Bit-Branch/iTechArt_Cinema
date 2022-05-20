﻿using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetMovies(
            [FromQuery] string? term,
            [FromQuery] PaginationRequest paginationRequest
        )
        {
            if (paginationRequest.IsEmpty())
            {
                return Ok(
                    term == null
                        ? await _movieService.GetAllAsync()
                        : await _movieService.FindAllByTermAsync(term)
                );
            }

            return Ok(await _movieService.GetPagedAsync(paginationRequest));
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var deletedMovieId = await _movieService.DeleteMovieAsync(id);

            if (deletedMovieId == -1)
            {
                return NotFound();
            }

            return Ok(deletedMovieId);
        }
    }
}