using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Application.Interfaces;

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
        public async Task<IActionResult> CreateFavorImage([FromForm] CreateFavorImageDto createImageDto)
        {
            return Ok(await _imageService.CreateImageAsync(createImageDto.Content));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFavor([FromBody] CreateFavorDto favorDto)
        {
            return Ok(await _favorService.CreateFavorAsync(favorDto));
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
    }
}