using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class SeatTypeDto
    {
        [Required]
        public string Name { get; set; }
    }
}