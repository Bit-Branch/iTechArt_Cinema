namespace CinemaApp.Domain.Entities
{
    public class Hall
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CinemaId { get; set; }
        public string? SeatingPlan { get; set; }
        public Cinema Cinema { get; set; }
        public ICollection<Seat> Seats { get; set; }
        public ICollection<MovieSession> MovieSessions { get; set; }
    }
}