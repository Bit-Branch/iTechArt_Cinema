using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateGenreDto
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
    }
}