using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CinemaApplication.Application.DTO
{
    public class CreateFavorDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
    }
}