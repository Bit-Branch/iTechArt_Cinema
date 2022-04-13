namespace CinemaApp.Application.DTOs.Seat
{
    public class SeatDto
    {
        public int Id { get; set; }
        public int HallId { get; set; }
        public int SeatTypeId { get; set; }
        public int SeatGroupId { get; set; }
        public int IndexInsideSeatGroup { get; set; }
        public string RowName { get; set; }
        public short SeatNo { get; set; }
    }
}