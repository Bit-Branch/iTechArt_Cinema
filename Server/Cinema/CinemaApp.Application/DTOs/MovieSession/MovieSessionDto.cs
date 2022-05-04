using CinemaApp.Application.DTOs.TicketPrice;

namespace CinemaApp.Application.DTOs.MovieSession
{
    public class MovieSessionDto
    {
        public long Id { get; set; }
        public TimeSpan ShowTime { get; set; }
        public TimeSpan EndShowTime { get; set; }
        public DateTime ShowDate { get; set; }
        public int MovieId { get; set; }
        public int HallId { get; set; }
        public IEnumerable<TicketPriceDto> TicketPrices { get; set; }
    }
}