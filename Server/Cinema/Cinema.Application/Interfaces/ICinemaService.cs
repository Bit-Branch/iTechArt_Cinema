using CinemaApplication.Application.DTO;

namespace CinemaApplication.Application.Interfaces
{
    public interface ICinemaService
    {
        Task<int> CreateCinemaAsync(CreateCinemaDto createCinemaDto);
        Task<CinemaDto> GetCinemaByIdAsync(int id);
        Task<List<CinemaDto>> GetAllAsync();
    }
}