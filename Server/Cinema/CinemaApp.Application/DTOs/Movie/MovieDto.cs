using CinemaApp.Application.DTOs.Genre;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.DTOs.Movie
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int YearOfIssue { get; set; }
        public long ImageId { get; set; }
        public Image Image { get; set; }
        public DateTime ShowInCinemasStartDate { get; set; }
        public DateTime ShowInCinemasEndDate { get; set; }
        public short DurationInMinutes { get; set; }
        public GenreDto Genre { get; set; }
    }
}