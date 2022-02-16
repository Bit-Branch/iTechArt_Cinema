using CinemaApp.Application.DTOs.City;

namespace CinemaApp.Application.Interfaces
{
    public interface ICityService
    {
        Task<int> CreateCityAsync(CreateCityDto createCityDto);
        Task<IEnumerable<CityDto>> GetAllAsync();
        Task<IEnumerable<CityDto>> FindAllByTermAsync(string term);
        bool CheckForDuplicates(CreateCityDto createCityDto);
    }
}