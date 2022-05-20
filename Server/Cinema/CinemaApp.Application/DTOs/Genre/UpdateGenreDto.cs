using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace CinemaApp.Application.DTOs.Genre
{
    public class UpdateGenreDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }
    }
}