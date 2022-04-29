using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Genre;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

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

        [HttpPut]
        public async Task<IActionResult> UpdateGenre([FromBody] UpdateGenreDto genreDto)
        {
            return Ok(await _genreService.UpdateGenreAsync(genreDto));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _genreService.GetAllAsync();

            return Ok(genres);
        }

        [HttpGet("Paged")]
        public async Task<IActionResult> GetPagedGenres([FromQuery] PaginationRequest paginationRequest)
        {
            var paginatingResult = await _genreService
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
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var deletedGenreId = await _genreService.DeleteGenreAsync(id);

            if (deletedGenreId == 0)
            {
                return NotFound();
            }

            return Ok(deletedGenreId);
        }
    }
}