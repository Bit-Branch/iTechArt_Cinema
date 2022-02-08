using Microsoft.AspNetCore.Http;
using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateMovieDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        public IFormFile Cover { get; set; }
        [Required]
        [StringLength(1000)]
        public string Description { get; set; }
        [Required]
        public byte GenreId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        [Min(0)]
        public short DurationInMinutes { get; set; }
    }
}