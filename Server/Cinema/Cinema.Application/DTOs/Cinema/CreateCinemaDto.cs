using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateCinemaDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string Address { get; set; }
        [Required]
        public short CityId { get; set; }
        [Required]
        public ICollection<CreateHallDto> Halls { get; set; }
        public ICollection<CreateCinemaFavorDto> CinemaFavors { get; set; }
    }
}