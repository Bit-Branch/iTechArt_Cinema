using CinemaApp.Application.DTOs.Movie;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieService
    {
        Task<int> CreateMovieAsync(CreateMovieDto createMovieDto);
        Task<MovieDto?> GetMovieByIdAsync(int id);
        Task<IEnumerable<MovieDto>> GetAllAsync();
        Task<IEnumerable<MovieDto>> FindAllByTermAsync(string term);
        Task<int> DeleteMovieAsync(int id);
    }
}