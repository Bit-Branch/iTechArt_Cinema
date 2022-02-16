using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.InteropServices;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
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

        [HttpPost("Create-image")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateFavorImage([FromForm] CreateFavorImageDto createImageDto)
        {
            return Ok(await _imageService.CreateImageAsync(createImageDto.Content));
        }

        [HttpPost("Create")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateFavor([FromBody] CreateFavorDto favorDto)
        {
            return Ok(await _favorService.CreateFavorAsync(favorDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetFavors([Optional] [FromQuery] string term)
        {
            var favors = term != null
                ? await _favorService.FindAllByTermAsync(term)
                : await _favorService.GetAllAsync();

            if (favors == null)
            {
                return NotFound();
            }

            return Ok(favors);
        }
    }
}