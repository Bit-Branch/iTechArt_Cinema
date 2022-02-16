using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.InteropServices;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
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
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateCity([FromBody] CreateCityDto cityDto)
        {
            if (!_cityService.CheckForDuplicates(cityDto))
            {
                return Ok(await _cityService.CreateCityAsync(cityDto));
            }

            return BadRequest("City with such name is already exists.");
        }

        [HttpGet]
        public async Task<IActionResult> GetCities([Optional] [FromQuery] string term)
        {
            var cities = term != null
                ? await _cityService.FindAllByTermAsync(term)
                : await _cityService.GetAllAsync();

            if (cities == null)
            {
                return NotFound();
            }

            return Ok(cities);
        }
    }
}