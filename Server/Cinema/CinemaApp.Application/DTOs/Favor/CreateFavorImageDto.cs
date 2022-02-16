using Microsoft.AspNetCore.Http;
using CinemaApp.Application.Attributes;
using CinemaApp.Domain.Constants;

namespace CinemaApp.Application.DTOs.Favor
{
    public class CreateFavorImageDto
    {
        [MaxFileSize(0.3 * 1024 * 1024)]
        [AllowedExtensions(new[] {ImageFileExtensions.JpegExtension, ImageFileExtensions.PngExtension})]
        [ExpectedImageAspectRatio(4, 3)]
        public IFormFile Content { get; set; }
    }
}