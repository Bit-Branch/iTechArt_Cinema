using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Entities;
using CinemaApplication.Infrastructure.Contexts;

namespace CinemaApplication.Infrastructure.Services
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

        public async Task<List<FavorDto>> GetAllAsync()
        {
            return await _context.Favors
                .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}