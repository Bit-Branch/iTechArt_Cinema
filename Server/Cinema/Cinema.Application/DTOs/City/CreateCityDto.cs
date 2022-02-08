using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateCityDto
    {
        [Required]
        [StringLength(189)]
        public string Name { get; set; }
    }
}