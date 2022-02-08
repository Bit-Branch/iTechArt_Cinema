namespace CinemaApplication.Domain.Entities
{
    public class TicketPrice
    {
        public int MovieSessionId { get; set; }
        public MovieSession MovieSession { get; set; }
        public byte SeatTypeId { get; set; }
        public SeatType SeatType { get; set; }
        public decimal Price { get; set; }
    }
}