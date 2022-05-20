using CinemaApp.Application.DTOs.CinemaFavor;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.DTOs.Hall;

namespace CinemaApp.Application.DTOs.Cinema
{
    public class CinemaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public CityDto City { get; set; }
        public IEnumerable<HallDto> Halls { get; set; }
        public IEnumerable<CinemaFavorDto> CinemaFavors { get; set; }
    }
}