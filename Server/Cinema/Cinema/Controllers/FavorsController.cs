using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    public class FavorsController : ControllerBase
    {
        private readonly IFavorService _favorService;
        private readonly IImageService _imageService;

        public FavorsController(IFavorService favorService, IImageService imageService)
        {
            _favorService = favorService;
            _imageService = imageService;
        }

        [HttpPost("image")]
        public async Task<IActionResult> CreateFavorImage([FromForm] CreateFavorImageDto? createImageDto)
        {
            return Ok(await _imageService.CreateImageAsync(createImageDto.Content));
        }

        [HttpPut("image")]
        public async Task<IActionResult> UpdateFavorImage([FromForm] UpdateFavorImageDto updateFavorImageDto)
        {
            return Ok(await _imageService.UpdateImageAsync(updateFavorImageDto.Id, updateFavorImageDto.Content));
        }

        [HttpGet("image")]
        public async Task<IActionResult> GetFavorImage([FromQuery] long imageId)
        {
            var image = await _imageService.GetImageAsync(imageId);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFavor([FromBody] CreateFavorDto favorDto)
        {
            return Ok(await _favorService.CreateFavorAsync(favorDto));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFavor([FromBody] UpdateFavorDto favor)
        {
            return Ok(await _favorService.UpdateFavorAsync(favor));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetFavors([FromQuery] string? term)
        {
            var favors = term == null
                ? await _favorService.GetAllAsync()
                : await _favorService.FindAllByTermAsync(term);

            return Ok(favors);
        }

        [HttpGet("Paged")]
        public async Task<IActionResult> GetPagedFavors([FromQuery] PaginationRequest paginationRequest)
        {
            var paginatingResult = await _favorService
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
        public async Task<IActionResult> DeleteFavor(int id)
        {
            var deletedFavorId = await _favorService.DeleteFavorAsync(id);

            if (deletedFavorId == 0)
            {
                return NotFound();
            }

            return Ok(deletedFavorId);
        }
    }
}