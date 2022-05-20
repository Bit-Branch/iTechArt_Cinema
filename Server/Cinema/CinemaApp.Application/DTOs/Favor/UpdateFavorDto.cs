using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Favor
{
    public class UpdateFavorDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public long? ImageId { get; set; }

        [Required]
        [StringLength(100)]
        public string Description { get; set; }
    }
}