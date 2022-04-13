using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.Interfaces;
using CinemaApp.Application.DTOs.MovieSession;

namespace CinemaApp.Infrastructure.Services
{
    public class MovieSessionService : IMovieSessionService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MovieSessionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateMovieSessionsAsync(CreateMovieSessionDto[] movieSessionDtos)
        {
            foreach (var movieSessionDto in movieSessionDtos)
            {
                var movieSession = _mapper.Map<MovieSession>(movieSessionDto);

                await _context.MovieSessions.AddAsync(movieSession);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MovieSessionDto>> GetAllAsync()
        {
            return await _context.MovieSessions
                .ProjectTo<MovieSessionDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<long> DeleteMovieSessionAsync(long id)
        {
            var movieSession = _context.MovieSessions.Remove(_context.MovieSessions.Single(m => m.Id == id));
            await _context.SaveChangesAsync();
            return movieSession.Entity.Id;
        }
    }
}