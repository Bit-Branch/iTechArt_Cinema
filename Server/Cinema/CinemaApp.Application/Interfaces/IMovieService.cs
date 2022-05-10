using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieService
    {
        Task<int> CreateMovieAsync(CreateMovieDto createMovieDto);
        Task<MovieDto?> GetMovieByIdAsync(int id);
        Task<IEnumerable<MovieDto>> GetAllAsync();
        Task<IEnumerable<MovieDto>> GetAllNowShowingAsync();
        Task<IEnumerable<MovieDto>> GetAllComingSoonAsync();
        Task<IEnumerable<MovieDto>> FindAllByTermAsync(string term);
        Task<int> DeleteMovieAsync(int id);
        Task<int> UpdateMovieAsync(UpdateMovieDto movieDto);
        Task<PaginationResult<MovieDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        );
    }
}