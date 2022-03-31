namespace CinemaApp.Domain.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ShowInCinemasStartDate { get; set; }
        public DateTime ShowInCinemasEndDate { get; set; }
        public short DurationInMinutes { get; set; }
        public int GenreId { get; set; }
        public Genre Genre { get; set; }
        public long? ImageId { get; set; }
        public Image Image { get; set; }
        public ICollection<MovieSession> MovieSessions { get; set; }
    }
}