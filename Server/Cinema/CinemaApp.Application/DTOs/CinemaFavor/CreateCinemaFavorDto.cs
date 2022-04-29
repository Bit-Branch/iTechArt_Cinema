﻿using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.CinemaFavor
{
    public class CreateCinemaFavorDto
    {
        [Required]
        [Min(1)]
        public int FavorId { get; set; }

        [Required]
        [Min(0)]
        public decimal Price { get; set; }
    }
}