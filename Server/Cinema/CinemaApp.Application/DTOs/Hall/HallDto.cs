using CinemaApp.Application.DTOs.Seat;

namespace CinemaApp.Application.DTOs.Hall
{
    public class HallDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<SeatDto> Seats { get; set; }
    }
}