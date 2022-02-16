using CinemaApp.Application.DTOs.Favor;

namespace CinemaApp.Application.Interfaces
{
    public interface IFavorService
    {
        Task<int> CreateFavorAsync(CreateFavorDto createFavorDto);
        Task<IEnumerable<FavorDto>> GetAllAsync();
        Task<IEnumerable<FavorDto>> FindAllByTermAsync(string term);
    }
}