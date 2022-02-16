using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/seat-types")]
    public class SeatTypesController : ControllerBase
    {
        private readonly ISeatTypeService _seatTypeService;

        public SeatTypesController(ISeatTypeService seatTypeService)
        {
            _seatTypeService = seatTypeService;
        }

        [HttpPost("Create")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateSeatType([FromBody] CreateSeatTypeDto seatTypeDto)
        {
            return Ok(await _seatTypeService.CreateSeatTypeAsync(seatTypeDto));
        }

        [HttpGet]
        public async Task<IActionResult> GetSeatTypesByHallId([FromQuery] int hallId)
        {
            var seatTypes = await _seatTypeService.FindAllByHallIdAsync(hallId);

            if (seatTypes == null)
            {
                return NotFound();
            }

            return Ok(seatTypes);
        }
    }
}