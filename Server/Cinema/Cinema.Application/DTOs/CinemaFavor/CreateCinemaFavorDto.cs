using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace CinemaApplication.Application.DTO
{
    public class CreateCinemaFavorDto
    {
        [Required]
        public short FavorId { get; set; }
        [Required]
        [Min(0)]
        public decimal Price { get; set; }
    }
}