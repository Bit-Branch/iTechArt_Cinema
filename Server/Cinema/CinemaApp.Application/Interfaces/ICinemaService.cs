using CinemaApp.Application.DTOs.Cinema;

namespace CinemaApp.Application.Interfaces
{
    public interface ICinemaService
    {
        Task<int> CreateCinemaAsync(CreateCinemaDto createCinemaDto);
        Task<CinemaDto?> GetCinemaById(int id);
        Task<IEnumerable<CinemaDto>> GetAllAsync();
        Task<IEnumerable<CinemaDto>> FindAllByTermAsync(string term);
    }
}