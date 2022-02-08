using CinemaApplication.Application.DTO;

namespace CinemaApplication.Application.Interfaces
{
    public interface ICityService
    {
        Task<int> CreateCityAsync(CreateCityDto createCityDto);
        Task<List<CityDto>> GetAllAsync();
    }
}