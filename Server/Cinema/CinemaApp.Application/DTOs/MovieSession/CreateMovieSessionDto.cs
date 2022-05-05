using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.TicketPrice;

namespace CinemaApp.Application.DTOs.MovieSession
{
    public class CreateMovieSessionDto
    {
        [Required]
        public DateTime StartShowingTime { get; set; }

        [Required]
        public DateTime EndShowingTime { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public int HallId { get; set; }

        [Required]
        public IEnumerable<CreateTicketPriceDto> TicketPrices { get; set; }
    }
}