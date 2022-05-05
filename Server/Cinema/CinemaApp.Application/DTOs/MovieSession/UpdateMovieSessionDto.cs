using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.TicketPrice;

namespace CinemaApp.Application.DTOs.MovieSession
{
    public class UpdateMovieSessionDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime StartShowingTime { get; set; }

        [Required]
        public DateTime EndShowingTime { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public int HallId { get; set; }

        [Required]
        public IEnumerable<UpdateTicketPriceDto> TicketPrices { get; set; }
    }
}