using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Seat
{
    public class CreateSeatDto
    {
        [Required]
        public int SeatTypeId { get; set; }
    }
}