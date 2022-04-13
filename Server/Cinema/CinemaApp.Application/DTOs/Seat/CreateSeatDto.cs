using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Seat
{
    public class CreateSeatDto
    {
        [Required]
        public string RowName { get; set; }

        [Required]
        public short SeatNo { get; set; }

        [Required]
        public int SeatGroupId { get; set; }

        [Required]
        public int IndexInsideSeatGroup { get; set; }

        [Required]
        public int HallId { get; set; }

        [Required]
        public int SeatTypeId { get; set; }
    }
}