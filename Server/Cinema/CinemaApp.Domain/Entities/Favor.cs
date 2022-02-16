namespace CinemaApp.Domain.Entities
{
    public class Favor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long ImageId { get; set; }
        public Image Image { get; set; }
        public ICollection<CinemaFavors> CinemaFavors { get; set; }
    }
}