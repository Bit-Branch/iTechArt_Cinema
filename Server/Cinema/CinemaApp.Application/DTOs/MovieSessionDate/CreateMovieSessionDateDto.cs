using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.MovieSessionDate
{
    public class CreateMovieSessionDateDto
    {
        [Required]
        public DateTime ShowDate { get; set; }
    }
}