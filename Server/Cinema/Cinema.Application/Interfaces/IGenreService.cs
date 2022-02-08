using CinemaApplication.Application.DTO;

namespace CinemaApplication.Application.Interfaces
{
    public interface IGenreService
    {
        Task<int> CreateGenreAsync(CreateGenreDto createGenreDto);
        Task<List<GenreDto>> GetAllAsync();
    }
}