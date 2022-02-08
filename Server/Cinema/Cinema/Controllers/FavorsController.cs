using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Constants;

namespace CinemaApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavorsController : ControllerBase
    {
        private readonly IFavorService _favorService;

        public FavorsController(IFavorService favorService)
        {
            _favorService = favorService;
        }

        [HttpPost("Create")]
        [Authorize(Roles=Roles.Admin)]
        public async Task<IActionResult> CreateFavor([FromForm] CreateFavorDto favorDto)
        {
            return Ok(await _favorService.CreateFavorAsync(favorDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetFavors()
        {
            var favors = await _favorService.GetAllAsync();

            if (favors == null)
            {
                return NotFound();
            }

            return Ok(favors);
        }
    }
}