namespace CinemaApp.Domain.Entities
{
    public class CinemaFavors
    {
        public int CinemaId { get; set; }
        public Cinema Cinema { get; set; }
        public int FavorId { get; set; }
        public Favor Favor { get; set; }
        public decimal Price { get; set; }
    }
}