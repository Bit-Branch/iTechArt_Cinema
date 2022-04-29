using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace CinemaApp.Application.DTOs.TicketPrice
{
    public class UpdateTicketPriceDto
    {
        [Required]
        public int MovieSessionId { get; set; }

        [Required]
        public int SeatTypeId { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }
    }
}