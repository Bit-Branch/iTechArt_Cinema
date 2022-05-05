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
                        p =>
                            (
                                p.Movie.Title
                                + " "
                                + p.Hall.Cinema.Name
                                + " "
                                + p.StartShowingTime
                                + " "
                                + p.EndShowingTime
                            )
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

        /// <summary>
        /// Find all movie sessions that are in conflict (shown in the same time range)
        /// </summary>
        /// <param name="movieSessionDtos">Array of movie sessions by which conflicted sessions will be searched</param>
        /// <returns>All conflicted movie sessions</returns>
        public async Task<IEnumerable<MovieSessionDto>?> FindAllConflicted(CreateMovieSessionDto[] movieSessionDtos)
        {
            List<MovieSessionDto> allDuplicates = new List<MovieSessionDto>();

            foreach (var movieSessionDto in movieSessionDtos)
            {
                var movieSessionsInSameHallAndDate = await _context.MovieSessions
                    .Where(ms => ms.HallId == movieSessionDto.HallId)
                    .ProjectTo<MovieSessionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                var currentlyShowing = movieSessionsInSameHallAndDate
                    .FindAll(ms =>
                        (movieSessionDto.StartShowingTime >= ms.StartShowingTime
                         && movieSessionDto.StartShowingTime <= ms.EndShowingTime)
                        || (movieSessionDto.EndShowingTime >= ms.StartShowingTime
                            && movieSessionDto.EndShowingTime <= ms.EndShowingTime)
                    );

                allDuplicates.AddRange(currentlyShowing);
            }

            return allDuplicates.Count > 0 ? allDuplicates : null;
        }

        public async Task<long> DeleteMovieSessionAsync(long id)
        {
            var movieSession = _context.MovieSessions.Remove(_context.MovieSessions.Single(m => m.Id == id));
            await _context.SaveChangesAsync();
            return movieSession.Entity.Id;
        }
    }
}