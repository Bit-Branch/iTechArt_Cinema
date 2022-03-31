namespace CinemaApp.Domain.Entities
{
    public class TicketSeat
    {
        public long TicketId { get; set; }
        public Ticket Ticket { get; set; }
        public long SeatId { get; set; }
        public Seat Seat { get; set; }
        public bool IsBooked { get; set; }
    }
}