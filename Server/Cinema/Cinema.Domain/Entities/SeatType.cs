namespace CinemaApplication.Domain.Entities
{
    public class SeatType
    {
        public byte Id { get; set; }
        public string Name { get; set; }
        public ICollection<Seat> Seats { get; set; }
        public ICollection<TicketPrice> TicketPrices { get; set; }
    }
}