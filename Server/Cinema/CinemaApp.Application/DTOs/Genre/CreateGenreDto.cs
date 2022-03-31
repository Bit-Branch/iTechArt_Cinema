using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Genre
{
    public class CreateGenreDto
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
    }
}