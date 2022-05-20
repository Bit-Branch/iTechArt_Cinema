using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.DTOs.CinemaFavor;
using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface ICinemaService
    {
        Task<int> CreateCinemaAsync(CreateCinemaDto createCinemaDto);
        Task<CinemaDto?> GetCinemaByIdAsync(int id);
        Task<IEnumerable<CinemaDto>> GetAllAsync();
        Task<IEnumerable<CinemaDto>> FindAllByTermAsync(string term);
        Task<int?> UpdateCinemaAsync(UpdateCinemaDto cinema);
        Task<int> DeleteCinemaAsync(int id);
        Task<PaginationResult<DisplayCinemaDto>> GetPagedAsync(PaginationRequest paginationRequest);
        Task<IEnumerable<HallDto>> GetAllHallsByCinemaIdAsync(int cinemaId);
        Task<IEnumerable<CinemaFavorDto>> GetAllCinemaFavorsByCinemaIdAsync(int id);
    }
}