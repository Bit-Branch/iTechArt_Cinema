using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieSessionService
    {
        Task CreateMovieSessionsAsync(CreateMovieSessionDto[] movieSessionDtos);
        Task UpdateMovieSessionsAsync(UpdateMovieSessionDto[] movieSessionDtos);
        Task<IEnumerable<MovieSessionDto>> GetAllAsync();
        Task<long> DeleteMovieSessionAsync(long id);
        Task<PaginationResult<DisplayMovieSessionDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        );
    }
}