using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.CinemaFavor;
using CinemaApp.Application.DTOs.Hall;

namespace CinemaApp.Application.DTOs.Cinema
{
    public class CreateCinemaDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Address { get; set; }
        
        [Required]
        public int CityId { get; set; }
        
        [Required]
        public ICollection<CreateHallDto> Halls { get; set; }
        
        public ICollection<CreateCinemaFavorDto> CinemaFavors { get; set; }
    }
}