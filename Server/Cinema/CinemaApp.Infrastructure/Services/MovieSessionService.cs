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

        public async Task CreateMovieSessionsAsync(CreateMovieSessionDto[] movieSessionDtos)
        {
            foreach (var movieSessionDto in movieSessionDtos)
            {
                var movieSession = _mapper.Map<MovieSession>(movieSessionDto);

                await _context.MovieSessions.AddAsync(movieSession);
            }

            await _context.SaveChangesAsync();
        }
    }
}