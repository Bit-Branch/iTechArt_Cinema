using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieService
    {
        Task<int> CreateMovieAsync(CreateMovieDto createMovieDto);
        Task<MovieDto?> GetMovieByIdAsync(int id);
        Task<IEnumerable<MovieDto>> GetAllAsync();
        Task<IEnumerable<MovieDto>> FindAllByTermAsync(string term);
        Task<int> DeleteMovieAsync(int id);
        Task<int> UpdateMovieAsync(UpdateMovieDto movieDto);
        Task<PaginationResult<MovieDto>> GetPagedAsync(PaginationRequest paginationRequest);
    }
}