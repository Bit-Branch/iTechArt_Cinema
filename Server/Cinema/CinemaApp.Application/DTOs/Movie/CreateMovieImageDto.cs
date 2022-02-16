using Microsoft.AspNetCore.Http;
using CinemaApp.Application.Attributes;
using CinemaApp.Domain.Constants;

namespace CinemaApp.Application.DTOs.Movie
{
    public class CreateMovieImageDto
    {
        [MaxFileSize(0.5 * 1024 * 1024)]
        [AllowedExtensions(new[] {ImageFileExtensions.JpegExtension, ImageFileExtensions.PngExtension})]
        [ExpectedImageAspectRatio(2, 3)]
        public IFormFile Content { get; set; }
    }
}