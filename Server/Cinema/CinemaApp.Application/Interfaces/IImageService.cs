using Microsoft.AspNetCore.Http;

namespace CinemaApp.Application.Interfaces
{
    public interface IImageService
    {
        Task<long> CreateImageAsync(IFormFile file);
    }
}