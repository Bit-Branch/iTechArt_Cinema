namespace CinemaApp.Domain.Entities
{
    public class Seat
    {
        public int Id { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }
        public int SeatTypeId { get; set; }
        public int SeatGroupId { get; set; }
        public int IndexInsideSeatGroup { get; set; }
        public string RowName { get; set; }
        public short SeatNo { get; set; }
        public SeatType SeatType { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}