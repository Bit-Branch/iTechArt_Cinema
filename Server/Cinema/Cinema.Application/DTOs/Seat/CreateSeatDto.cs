using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateSeatDto
    {
        [Required]
        public byte SeatTypeId { get; set; }
    }
}