using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.CinemaFavor
{
    public class CreateCinemaFavorDto
    {
        [Required]
        public int FavorId { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }
    }
}