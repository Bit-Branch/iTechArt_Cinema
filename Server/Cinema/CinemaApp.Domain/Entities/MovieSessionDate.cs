namespace CinemaApp.Domain.Entities
{
    public class MovieSessionDate
    {
        public long Id { get; set; }
        public DateTime ShowDate { get; set; }
        public long MovieSessionId { get; set; }
        public MovieSession MovieSession { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}