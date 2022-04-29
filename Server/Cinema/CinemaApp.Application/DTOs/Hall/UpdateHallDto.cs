using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.Seat;

namespace CinemaApp.Application.DTOs.Hall
{
    public class UpdateHallDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string SeatingPlan { get; set; }

        [Required]
        public IEnumerable<UpdateSeatDto> Seats { get; set; }
    }
}