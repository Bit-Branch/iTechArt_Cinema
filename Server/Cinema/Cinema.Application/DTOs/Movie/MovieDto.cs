namespace CinemaApplication.Application.DTO
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public byte[] Cover { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short DurationInMinutes { get; set; }
        public GenreDto Genre { get; set; }
    }
}