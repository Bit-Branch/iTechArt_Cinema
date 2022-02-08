namespace CinemaApplication.Domain.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public byte[] Cover { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short DurationInMinutes { get; set; }
        public byte GenreId { get; set; }
        public Genre Genre { get; set; }
        public ICollection<MovieSession> MovieSessions { get; set; }
    }
}