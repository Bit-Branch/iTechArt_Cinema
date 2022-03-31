using CinemaApp.Application.DTOs.Genre;

namespace CinemaApp.Application.Interfaces
{
    public interface IGenreService
    {
        Task<int> CreateGenreAsync(CreateGenreDto createGenreDto);
        Task<IEnumerable<GenreDto>> GetAllAsync();
    }
}