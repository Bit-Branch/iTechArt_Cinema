using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.Attributes;
using CinemaApp.Domain.Constants;

namespace CinemaApp.Application.DTOs.Movie
{
    public class UpdateMovieDto
    {
        [Required]
        public long Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [AllowedYearRange(MovieYearsOfIssue.minYear)]
        public int YearOfIssue { get; set; }

        [Required]
        public int GenreId { get; set; }

        public long? ImageId { get; set; }

        [Required]
        public DateTime ShowInCinemasStartDate { get; set; }

        [Required]
        public DateTime ShowInCinemasEndDate { get; set; }

        [Required]
        [Min(0)]
        public short DurationInMinutes { get; set; }
    }
}