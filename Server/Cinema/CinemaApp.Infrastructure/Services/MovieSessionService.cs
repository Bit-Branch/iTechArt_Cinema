using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.Interfaces;
using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Application.ExtensionMethods;

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

        public async Task UpdateMovieSessionsAsync(UpdateMovieSessionDto[] movieSessionDtos)
        {
            foreach (var movieSessionDto in movieSessionDtos)
            {
                var movieSession = _mapper.Map<MovieSession>(movieSessionDto);

                _context.MovieSessions.Update(movieSession);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MovieSessionDto>> GetAllAsync()
        {
            return await _context.MovieSessions
                .ProjectTo<MovieSessionDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PaginationResult<DisplayMovieSessionDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<MovieSession> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.MovieSessions
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.MovieSessions
                    .OrderByDescending(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }

            if (searchTerm != null)
            {
                query = query
                    .Where(
                        p => (p.Movie.Title + " " + p.Hall.Cinema.Name + " " + p.ShowDate + " " + p.ShowTime)
                            .Contains(searchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<DisplayMovieSessionDto> result = new PaginationResult<DisplayMovieSessionDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<DisplayMovieSessionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }

        public async Task<long> DeleteMovieSessionAsync(long id)
        {
            var movieSession = _context.MovieSessions.Remove(_context.MovieSessions.Single(m => m.Id == id));
            await _context.SaveChangesAsync();
            return movieSession.Entity.Id;
        }
    }
}