using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCity([FromBody] CreateCityDto cityDto)
        {
            if (_cityService.DuplicatesExists(cityDto))
            {
                return BadRequest("City with such name is already exists.");
            }

            return Ok(await _cityService.CreateCityAsync(cityDto));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities([FromQuery] string? term)
        {
            var cities = term == null
                ? await _cityService.GetAllAsync()
                : await _cityService.FindAllByTermAsync(term);
            
            return Ok(cities);
        }
    }
}