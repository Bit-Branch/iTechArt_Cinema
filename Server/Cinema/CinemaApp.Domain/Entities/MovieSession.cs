namespace CinemaApp.Domain.Entities
{
    public class MovieSession
    {
        public long Id { get; set; }
        public string ShowTime { get; set; }
        public DateTime ShowDate { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }
        public ICollection<TicketPrice> TicketPrices { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}