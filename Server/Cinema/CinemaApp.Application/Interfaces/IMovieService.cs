using CinemaApp.Application.DTOs.Movie;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieService
    {
        Task<int> CreateMovieAsync(CreateMovieDto createMovieDto);
        Task<MovieDto?> GetMovieById(int id);
        Task<IEnumerable<MovieDto>> GetAllAsync();
        Task<IEnumerable<MovieDto>> FindAllByTermAsync(string term);
    }
}