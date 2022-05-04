using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface ISeatTypeService
    {
        Task<int> CreateSeatTypeAsync(CreateSeatTypeDto createSeatTypeDto);
        Task<IEnumerable<SeatTypeDto>> GetAllAsync();
        Task<IEnumerable<SeatTypeDto>> FindAllByTermAsync(string term);
        Task<int> UpdateSeatTypeAsync(UpdateSeatTypeDto seatTypeDto);
        Task<int> DeleteSeatTypeAsync(int id);
        Task<PaginationResult<SeatTypeDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        );
        Task<SeatTypeDto?> GetSeatTypeByIdAsync(int id);
    }
}