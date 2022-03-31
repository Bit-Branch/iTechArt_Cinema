using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.DTOs.SeatType;

namespace CinemaApp.Application.Interfaces
{
    public interface IHallService
    {
        Task<IEnumerable<HallDto>> FindAllByCinemaIdAsync(int cinemaId);

        Task<IEnumerable<SeatTypeDto>> FindSeatTypesByHallIdAsync(int hallId);
    }
}