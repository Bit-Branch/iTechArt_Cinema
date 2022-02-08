namespace CinemaApplication.Domain.Entities
{
    public class MovieSession
    {
        public int Id { get; set; }
        public DateTime ShowDateTime { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }
        public ICollection<MovieSessionDate> MovieSessionDates { get; set; }
        public ICollection<TicketPrice> TicketPrices { get; set; }
    }
}