namespace CinemaApplication.Domain.Entities
{
    public class Seat
    {
        public int Id { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }
        public byte SeatTypeId { get; set; }
        public SeatType SeatType { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}