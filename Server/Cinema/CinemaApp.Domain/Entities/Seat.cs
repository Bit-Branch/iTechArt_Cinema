﻿namespace CinemaApp.Domain.Entities
{
    public class Seat
    {
        public long Id { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }
        public int SeatTypeId { get; set; }
        public SeatType SeatType { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<TicketSeat> TicketSeats { get; set; }
    }
}