using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface IFavorService
    {
        Task<int> CreateFavorAsync(CreateFavorDto createFavorDto);
        Task<IEnumerable<FavorDto>> GetAllAsync();
        Task<IEnumerable<FavorDto>> FindAllByTermAsync(string term);
        Task<int> UpdateFavorAsync(UpdateFavorDto favor);
        Task<int> DeleteFavorAsync(int id);
        Task<PaginationResult<FavorDto>> GetPagedAsync(PaginationRequest paginationRequest);
    }
}