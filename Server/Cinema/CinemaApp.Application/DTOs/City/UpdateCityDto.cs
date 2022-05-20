using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.Attributes;

namespace CinemaApp.Application.DTOs.City
{
    public class UpdateCityDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(189)]
        [SentenceCase]
        public string Name { get; set; }
    }
}