using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using CinemaApp.Application.Attributes;
using CinemaApp.Domain.Constants;

namespace CinemaApp.Application.DTOs.Favor
{
    public class CreateFavorImageDto
    {
        [Required]
        [MaxFileSizeInMegabytes(0.3)]
        [AllowedExtensions(new[] {ImageFileExtensions.JpegExtension, ImageFileExtensions.PngExtension})]
        [ExpectedImageAspectRatio(5, 3)]
        public IFormFile Content { get; set; }
    }
}