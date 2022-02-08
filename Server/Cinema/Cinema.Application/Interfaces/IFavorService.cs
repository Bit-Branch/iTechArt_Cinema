using CinemaApplication.Application.DTO;

namespace CinemaApplication.Application.Interfaces
{
    public interface IFavorService
    {
        Task<int> CreateFavorAsync(CreateFavorDto createFavorDto);
        Task<List<FavorDto>> GetAllAsync();
    }
}