using CinemaApp.Application.DTOs.MovieSession;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieSessionService
    {
        Task<long> CreateMovieSessionAsync(CreateMovieSessionDto createMovieSessionDto);
    }
}