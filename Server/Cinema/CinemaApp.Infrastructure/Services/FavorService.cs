using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
{
    public class FavorService : IFavorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FavorService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateFavorAsync(CreateFavorDto createFavorDto)
        {
            var favor = _mapper.Map<Favor>(createFavorDto);

            await _context.Favors.AddAsync(favor);

            await _context.SaveChangesAsync();

            return favor.Id;
        }

        public async Task<IEnumerable<FavorDto>> GetAllAsync()
        {
            return await _context.Favors
                .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<FavorDto>> FindAllByTermAsync(string term)
        {
            return await _context.Favors
                .Where(f => f.Name.StartsWith(term))
                .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}