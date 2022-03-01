using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
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

        public async Task<MovieDto?> GetMovieByIdAsync(int id)
        {
            var movie = await _context.Movies
                .Where(m => m.Id == id)
                .Include(m => m.Genre)
                .FirstOrDefaultAsync();

            return movie != null ? _mapper.Map<MovieDto>(movie) : null;
        }

        public async Task<IEnumerable<MovieDto>> GetAllAsync()
        {
            return await _context.Movies
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<MovieDto>> FindAllByTermAsync(string term)
        {
            return await _context.Movies
                .Where(f => f.Title.StartsWith(term))
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}