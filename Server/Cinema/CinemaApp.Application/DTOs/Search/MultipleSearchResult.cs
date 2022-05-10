using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.DTOs.Movie;

namespace CinemaApp.Application.DTOs.Search
{
    public class MultipleSearchResult
    {
        public IEnumerable<CityDto> Cities { get; set; }
        public IEnumerable<SearchCinemaDto> Cinemas { get; set; }
        public IEnumerable<SearchMovieDto> Movies { get; set; }
    }
}