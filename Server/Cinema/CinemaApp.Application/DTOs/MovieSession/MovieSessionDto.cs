using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.DTOs.TicketPrice;

namespace CinemaApp.Application.DTOs.MovieSession
{
    public class MovieSessionDto
    {
        public long Id { get; set; }
        public string ShowTime { get; set; }
        public DateTime ShowDate { get; set; }
        public MovieDto Movie { get; set; }
        public HallDto Hall { get; set; }
        public IEnumerable<TicketPriceDto> TicketPrices { get; set; }
    }
}