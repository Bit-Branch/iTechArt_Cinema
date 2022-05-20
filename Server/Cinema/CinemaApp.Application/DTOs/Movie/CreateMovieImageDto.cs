using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using CinemaApp.Application.Attributes;
using CinemaApp.Domain.Constants;

namespace CinemaApp.Application.DTOs.Movie
{
    public class CreateMovieImageDto
    {
        [Required]
        [MaxFileSizeInMegabytes(0.5)]
        [AllowedExtensions(new[] {ImageFileExtensions.JpegExtension, ImageFileExtensions.PngExtension})]
        [ExpectedImageAspectRatio(2, 3)]
        public IFormFile Content { get; set; }
    }
}