using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Infrastructure.Contexts;

namespace CinemaApplication.Infrastructure.Services
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
            var cinema = _mapper.Map<Domain.Entities.Cinema>(createCinemaDto);

            await _context.Cinemas.AddAsync(cinema);

            await _context.SaveChangesAsync();

            return cinema.Id;
        }

        public async Task<CinemaDto> GetCinemaByIdAsync(int id)
        {
            var cinema = _context.Cinemas
                .Where(m => m.Id == id)
                .SingleOrDefaultAsync()
                .Result;
            
            return _mapper.Map<CinemaDto>(cinema);
        }
        
        public async Task<List<CinemaDto>> GetAllAsync()
        {
            return await _context.Cinemas
                .Include(cinema => cinema.Halls)
                .ProjectTo<CinemaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}