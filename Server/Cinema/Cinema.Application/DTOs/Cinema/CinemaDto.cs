namespace CinemaApplication.Application.DTO
{
    public class CinemaDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<HallDto> Halls { get; set; }
    }
}