using AutoMapper;
using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.Interfaces;

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

        public async Task<long> CreateMovieSessionAsync(CreateMovieSessionDto createMovieSessionDto)
        {
            var movieSession = _mapper.Map<MovieSession>(createMovieSessionDto);

            await _context.MovieSessions.AddAsync(movieSession);

            await _context.SaveChangesAsync();

            return movieSession.Id;
        }
    }
}