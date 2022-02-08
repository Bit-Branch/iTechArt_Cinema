using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Entities;
using CinemaApplication.Infrastructure.Contexts;

namespace CinemaApplication.Infrastructure.Services
{
    public class MovieService : IMovieService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MovieService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateMovieAsync(CreateMovieDto createMovieDto)
        {
            var movie = _mapper.Map<Movie>(createMovieDto);

            await _context.Movies.AddAsync(movie);

            await _context.SaveChangesAsync();

            return movie.Id;
        }

        public async Task<MovieDto> GetMovieByIdAsync(int id)
        {
            var movie = _context.Movies
                .Where(m => m.Id == id)
                .Include(m => m.Genre)
                .SingleOrDefaultAsync()
                .Result;
            
            return _mapper.Map<MovieDto>(movie);
        }
        
        public async Task<List<MovieDto>> GetAllAsync()
        {
            return await _context.Movies
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}