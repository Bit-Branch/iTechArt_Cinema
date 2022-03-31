using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.SeatType
{
    public class CreateSeatTypeDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}