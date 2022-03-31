namespace CinemaApp.Domain.Entities
{
    public class Ticket
    {
        public long Id { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public long MovieSessionId { get; set; }
        public MovieSession MovieSession { get; set; }
        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}