namespace CinemaApplication.Domain.Entities
{
    public class City
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public ICollection<Cinema> Cinemas { get; set; }
    }
}