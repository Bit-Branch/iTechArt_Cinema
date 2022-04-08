using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.Seat;

namespace CinemaApp.Application.DTOs.Hall
{
    public class CreateHallDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string SeatingPlan { get; set; }

        [Required]
        public IEnumerable<CreateSeatDto> Seats { get; set; }
    }
}