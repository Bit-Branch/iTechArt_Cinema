﻿using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.TicketPrice
{
    public class CreateTicketPriceDto
    {
        [Required]
        public int SeatTypeId { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }
    }
}