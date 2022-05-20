namespace CinemaApp.Domain.Entities
{
    public class TicketPrice
    {
        public long MovieSessionId { get; set; }
        public MovieSession MovieSession { get; set; }
        public int SeatTypeId { get; set; }
        public SeatType SeatType { get; set; }
        public decimal Amount { get; set; }
    }
}