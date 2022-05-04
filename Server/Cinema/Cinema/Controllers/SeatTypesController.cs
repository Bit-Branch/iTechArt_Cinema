using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    [Route("api/seat-types")]
    public class SeatTypesController : ControllerBase
    {
        private readonly ISeatTypeService _seatTypeService;

        public SeatTypesController(ISeatTypeService seatTypeService)
        {
            _seatTypeService = seatTypeService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSeatType([FromBody] CreateSeatTypeDto seatTypeDto)
        {
            return Ok(await _seatTypeService.CreateSeatTypeAsync(seatTypeDto));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSeatType([FromBody] UpdateSeatTypeDto seatTypeDto)
        {
            return Ok(await _seatTypeService.UpdateSeatTypeAsync(seatTypeDto));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetSeatTypes([FromQuery] string? term)
        {
            var seatTypes = term == null
                ? await _seatTypeService.GetAllAsync()
                : await _seatTypeService.FindAllByTermAsync(term);

            return Ok(seatTypes);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSeatType(int id)
        {
            var seatType = await _seatTypeService.GetSeatTypeByIdAsync(id);

            if (seatType == null)
            {
                return NotFound();
            }

            return Ok(seatType);
        }

        [HttpGet("Paged")]
        public async Task<IActionResult> GetPagedSeatTypes([FromQuery] PaginationRequest paginationRequest)
        {
            var paginatingResult = await _seatTypeService
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
        public async Task<IActionResult> DeleteSeatType(int id)
        {
            var deletedSeatTypeId = await _seatTypeService.DeleteSeatTypeAsync(id);

            if (deletedSeatTypeId == 0)
            {
                return NotFound();
            }

            return Ok(deletedSeatTypeId);
        }
    }
}