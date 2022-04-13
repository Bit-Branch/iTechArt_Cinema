using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Application.Interfaces;

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

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetSeatTypes([FromQuery] string? term)
        {
            var seatTypes = term == null
                ? await _seatTypeService.GetAllAsync()
                : await _seatTypeService.FindAllByTermAsync(term);

            return Ok(seatTypes);
        }

        [HttpGet("halls/id")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSeatTypesByHallId([FromQuery] int hallId)
        {
            var seatTypes = await _seatTypeService.FindAllByHallIdAsync(hallId);

            return Ok(seatTypes);
        }
    }
}