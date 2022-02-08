namespace CinemaApplication.Application.DTO
{
    public class HallDto
    {
        public string Name { get; set; }
        public ICollection<SeatDto> Seats { get; set; }
    }
}