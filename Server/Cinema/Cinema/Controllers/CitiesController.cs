using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

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
            if (_cityService.DuplicatesExists(cityDto.Name))
            {
                return BadRequest("City with such name is already exists.");
            }

            return Ok(await _cityService.CreateCityAsync(cityDto));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCity([FromBody] UpdateCityDto cityDto)
        {
            if (_cityService.DuplicatesExists(cityDto.Name))
            {
                return BadRequest("City with such name is already exists.");
            }

            return Ok(await _cityService.UpdateCityAsync(cityDto));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities(
            [FromQuery] string? term,
            [FromQuery] PaginationRequest paginationRequest
        )
        {
            if (paginationRequest.IsEmpty())
            {
                return Ok(term == null
                    ? await _cityService.GetAllAsync()
                    : await _cityService.FindAllByTermAsync(term)
                );
            }

            return Ok(
                await _cityService
                    .GetPagedAsync(
                        paginationRequest.Page * paginationRequest.PageSize,
                        paginationRequest.PageSize,
                        paginationRequest.Ascending,
                        paginationRequest.SortingColumn,
                        paginationRequest.SearchTerm
                    )
            );
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var deletedCityId = await _cityService.DeleteCityAsync(id);

            if (deletedCityId == -1)
            {
                return NotFound();
            }

            return Ok(deletedCityId);
        }
    }
}