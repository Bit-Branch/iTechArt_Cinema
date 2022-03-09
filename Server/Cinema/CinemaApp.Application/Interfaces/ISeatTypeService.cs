using CinemaApp.Application.DTOs.SeatType;

namespace CinemaApp.Application.Interfaces
{
    public interface ISeatTypeService
    {
        Task<int> CreateSeatTypeAsync(CreateSeatTypeDto createSeatTypeDto);
        Task<IEnumerable<SeatTypeDto>> GetAllAsync();
        Task<IEnumerable<SeatTypeDto>> FindAllByTermAsync(string term);
    }
}