using Cinema.Application.DTO;

namespace Cinema.Application.Interfaces;

public interface IMovieService
{
    Task<int> CreateMovieAsync(CreateMovieDto createMovieDto);
}