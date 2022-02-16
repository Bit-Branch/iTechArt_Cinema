using CinemaApp.Application.DTOs.Hall;

namespace CinemaApp.Application.Interfaces
{
    public interface IHallService
    {
        Task<IEnumerable<HallDto>> FindAllByCinemaIdAsync(int cinemaId);
    }
}