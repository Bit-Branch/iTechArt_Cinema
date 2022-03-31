using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Infrastructure.Services
{
    public class CinemaService : ICinemaService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CinemaService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateCinemaAsync(CreateCinemaDto createCinemaDto)
        {
            var cinema = _mapper.Map<Cinema>(createCinemaDto);

            await _context.Cinemas.AddAsync(cinema);

            await _context.SaveChangesAsync();

            return cinema.Id;
        }

        public async Task<CinemaDto?> GetCinemaByIdAsync(int id)
        {
            var cinema = await _context.Cinemas
                .Where(m => m.Id == id)
                .FirstOrDefaultAsync();

            return cinema != null ? _mapper.Map<CinemaDto>(cinema) : null;
        }

        public async Task<IEnumerable<CinemaDto>> GetAllAsync()
        {
            return await _context.Cinemas
                .Include(cinema => cinema.Halls)
                .ProjectTo<CinemaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<CinemaDto>> FindAllByTermAsync(string term)
        {
            return await _context.Cinemas
                .Where(f => f.Name.StartsWith(term))
                .ProjectTo<CinemaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}