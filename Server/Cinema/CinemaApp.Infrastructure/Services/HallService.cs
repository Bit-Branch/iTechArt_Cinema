using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.DTOs.SeatType;
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

        public async Task<HallDto?> GetHallByIdAsync(int id)
        {
            var hall = await _context.Halls
                .Where(m => m.Id == id)
                .Include(h => h.Seats)
                .FirstOrDefaultAsync();

            return hall != null ? _mapper.Map<HallDto>(hall) : null;
        }

        public async Task<IEnumerable<HallDto>> FindAllByCinemaIdAsync(int cinemaId)
        {
            return await _context.Halls
                .Where(h => h.CinemaId == cinemaId)
                .ProjectTo<HallDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<SeatTypeDto>> FindSeatTypesByHallIdAsync(int hallId)
        {
            return await _context.SeatTypes
                .Where(st => st.Seats
                    .Any(s => s.HallId == hallId)
                )
                .Distinct()
                .ProjectTo<SeatTypeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}