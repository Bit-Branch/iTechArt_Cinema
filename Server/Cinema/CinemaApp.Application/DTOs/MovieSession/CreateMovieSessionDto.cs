using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.MovieSessionDate;
using CinemaApp.Application.DTOs.TicketPrice;

namespace CinemaApp.Application.DTOs.MovieSession
{
    public class CreateMovieSessionDto
    {
        [Required]
        public string ShowTime { get; set; }
        
        [Required]
        public int MovieId { get; set; }
        
        [Required]
        public int HallId { get; set; }
        
        [Required]
        public ICollection<CreateTicketPriceDto> TicketPrices { get; set; }
        
        [Required]
        public ICollection<CreateMovieSessionDateDto> MovieSessionDates { get; set; }
    }
}