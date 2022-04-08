using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Seat
{
    public class CreateSeatDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string RowName { get; set; }

        [Required]
        public int SeatNo { get; set; }

        [Required]
        public int SeatGroupId { get; set; }

        [Required]
        public int HallId { get; set; }

        [Required]
        public int SeatTypeId { get; set; }
    }
}