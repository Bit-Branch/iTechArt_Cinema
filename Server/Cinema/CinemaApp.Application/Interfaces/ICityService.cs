using CinemaApp.Application.DTOs.City;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface ICityService
    {
        Task<int> CreateCityAsync(CreateCityDto createCityDto);
        Task<IEnumerable<CityDto>> GetAllAsync();
        Task<IEnumerable<CityDto>> FindAllByTermAsync(string term);
        bool DuplicatesExists(string cityName);
        Task<int> UpdateCityAsync(UpdateCityDto cityDto);
        Task<int> DeleteCityAsync(int id);
        Task<PaginationResult<CityDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        );
    }
}