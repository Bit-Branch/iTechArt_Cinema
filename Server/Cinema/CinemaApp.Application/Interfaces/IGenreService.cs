using CinemaApp.Application.DTOs.Genre;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface IGenreService
    {
        Task<int> CreateGenreAsync(CreateGenreDto createGenreDto);
        Task<IEnumerable<GenreDto>> GetAllAsync();
        Task<int> UpdateGenreAsync(UpdateGenreDto genreDto);
        Task<int> DeleteGenreAsync(int id);
        Task<PaginationResult<GenreDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        );
    }
}