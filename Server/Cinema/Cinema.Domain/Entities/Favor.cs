namespace CinemaApplication.Domain.Entities
{
    public class Favor
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public ICollection<CinemaFavors> CinemaFavors { get; set; }
    }
}