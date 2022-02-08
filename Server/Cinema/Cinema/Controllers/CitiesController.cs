using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Constants;

namespace CinemaApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpPost("Create")]
        [Authorize(Roles=Roles.Admin)]
        public async Task<IActionResult> CreateCity([FromBody] CreateCityDto cityDto)
        {
            return Ok(await _cityService.CreateCityAsync(cityDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _cityService.GetAllAsync();

            if (cities == null)
            {
                return NotFound();
            }

            return Ok(cities);
        }
    }
}