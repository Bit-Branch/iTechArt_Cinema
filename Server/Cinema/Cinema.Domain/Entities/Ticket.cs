﻿namespace CinemaApplication.Domain.Entities
{
    public class Ticket
    {
        public long Id { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public long MovieSessionDateId { get; set; }
        public MovieSessionDate MovieSessionDate { get; set; }
        public int SeatId { get; set; }
        public Seat Seat { get; set; }
        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}