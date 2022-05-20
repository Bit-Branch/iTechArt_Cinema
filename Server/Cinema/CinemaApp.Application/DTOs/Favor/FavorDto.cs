using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.DTOs.Favor
{
    public class FavorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Image Image { get; set; }
        public string Description { get; set; }
    }
}