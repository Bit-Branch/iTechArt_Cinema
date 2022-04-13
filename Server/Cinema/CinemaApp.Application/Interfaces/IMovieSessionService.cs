using CinemaApp.Application.DTOs.MovieSession;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieSessionService
    {
        Task CreateMovieSessionsAsync(CreateMovieSessionDto[] movieSessionDtos);
        Task<IEnumerable<MovieSessionDto>> GetAllAsync();
        Task<long> DeleteMovieSessionAsync(long id);
    }
}