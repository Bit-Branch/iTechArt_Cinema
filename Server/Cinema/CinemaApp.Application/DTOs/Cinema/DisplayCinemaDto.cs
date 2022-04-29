using CinemaApp.Application.DTOs.City;

namespace CinemaApp.Application.DTOs.Cinema
{
    public class DisplayCinemaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public CityDto City { get; set; }
    }
}