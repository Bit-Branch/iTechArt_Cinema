using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Movie
{
    public class CreateMovieDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        
        [Required]
        [StringLength(1000)]
        public string Description { get; set; }
        
        [Required]
        public int GenreId { get; set; }
        
        [Required]
        public long ImageId { get; set; }
        
        [Required]
        public DateTime ShowInCinemasStartDate { get; set; }
        
        [Required]
        public DateTime ShowInCinemasEndDate { get; set; }
        
        [Required]
        [Min(0)]
        public short DurationInMinutes { get; set; }
    }
}