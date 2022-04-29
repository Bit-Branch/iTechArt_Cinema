using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using CinemaApp.Domain.Constants;
using CinemaApp.Application.Attributes;

namespace CinemaApp.Application.DTOs.Movie
{
    public class UpdateMovieImageDto
    {
        [Required]
        public long Id { get; set; }

        [Required]
        [MaxFileSizeInMegabytes(0.5)]
        [AllowedExtensions(new[] {ImageFileExtensions.JpegExtension, ImageFileExtensions.PngExtension})]
        [ExpectedImageAspectRatio(2, 3)]
        public IFormFile Content { get; set; }
    }
}