using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateHallDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public ICollection<CreateSeatDto> Seats { get; set; }
    }
}