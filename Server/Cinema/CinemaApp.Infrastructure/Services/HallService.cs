using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
{
    public class HallService : IHallService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public HallService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HallDto>> FindAllByCinemaIdAsync(int cinemaId)
        {
            return await _context.Halls
                .Where(h => h.CinemaId == cinemaId)
                .ProjectTo<HallDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}