namespace CinemaApplication.Domain.Entities
{
    public class MovieSessionDate
    {
        public long Id { get; set; }
        public int MovieSessionId { get; set; }
        public MovieSession MovieSession { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}