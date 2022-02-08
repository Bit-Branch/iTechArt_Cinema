namespace CinemaApplication.Domain.Entities
{
    public class Cinema
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public short CityId { get; set; }
        public City City { get; set; }
        public ICollection<Hall> Halls { get; set; }
        public ICollection<CinemaFavors> CinemaFavors { get; set; }
    }
}