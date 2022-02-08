using CinemaApplication.Application.DTO;

namespace CinemaApplication.Application.Interfaces
{
    public interface IMovieService
    {
        Task<int> CreateMovieAsync(CreateMovieDto createMovieDto);
        Task<MovieDto> GetMovieByIdAsync(int id);
        Task<List<MovieDto>> GetAllAsync();
    }
}