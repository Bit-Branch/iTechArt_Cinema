using CinemaApp.Application.DTOs.Genre;

namespace CinemaApp.Application.DTOs.Movie
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short DurationInMinutes { get; set; }
        public GenreDto Genre { get; set; }
    }
}