using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace CinemaApp.Application.DTOs.CinemaFavor
{
    public class UpdateCinemaFavorDto
    {
        [Required]
        public int CinemaId { get; set; }

        [Required]
        public int FavorId { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }
    }
}