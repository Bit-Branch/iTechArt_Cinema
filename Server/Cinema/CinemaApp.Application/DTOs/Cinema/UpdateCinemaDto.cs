using System.ComponentModel.DataAnnotations;
using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.DTOs.CinemaFavor;

namespace CinemaApp.Application.DTOs.Cinema
{
    public class UpdateCinemaDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; }

        [Required]
        public int CityId { get; set; }

        [Required]
        public IEnumerable<UpdateHallDto> Halls { get; set; }

        public IEnumerable<UpdateCinemaFavorDto> CinemaFavors { get; set; }
    }
}