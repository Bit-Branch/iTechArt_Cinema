using Microsoft.AspNetCore.Http;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Infrastructure.Services
{
    public class ImageService : IImageService
    {
        private readonly ApplicationDbContext _context;

        public ImageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<long> CreateImageAsync(IFormFile file)
        {
            var reader = new BinaryReader(file.OpenReadStream());

            var imageBytes = reader.ReadBytes((int) file.Length);

            var image = new Image
            {
                Content = imageBytes
            };

            await _context.Images.AddAsync(image);

            await _context.SaveChangesAsync();

            return image.Id;
        }

        public async Task<Image?> GetImageAsync(long id)
        {
            return await _context.Images
                .Where(img => img.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}