using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.ExtensionMethods;
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

        public async Task<int> UpdateMovieAsync(UpdateMovieDto movieDto)
        {
            var movie = _mapper.Map<Movie>(movieDto);

            _context.Movies.Update(movie);

            await _context.SaveChangesAsync();

            return movie.Id;
        }

        public async Task<MovieDto?> GetMovieByIdAsync(int id)
        {
            var movie = await _context.Movies
                .Where(m => m.Id == id)
                .Include(m => m.Genre)
                .Include(m => m.Image)
                .FirstOrDefaultAsync();

            return movie != null ? _mapper.Map<MovieDto>(movie) : null;
        }

        public async Task<IEnumerable<MovieDto>> GetAllAsync()
        {
            return await _context.Movies
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<MovieDto>> GetAllNowShowingAsync()
        {
            var currentDate = DateTime.Now;
            return await _context.Movies
                .Where(m => m.ShowInCinemasStartDate <= currentDate && m.ShowInCinemasEndDate >= currentDate)
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<MovieDto>> GetAllComingSoonAsync()
        {
            var currentDate = DateTime.Now;
            return await _context.Movies
                .Where(m => currentDate < m.ShowInCinemasStartDate)
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

        public async Task<int> DeleteMovieAsync(int id)
        {
            var movie = _context.Movies.Remove(_context.Movies.Single(m => m.Id == id));

            await _context.SaveChangesAsync();

            return movie.Entity.Id;
        }

        public async Task<PaginationResult<MovieDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<Movie> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.Movies
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.Movies
                    .OrderByDescending(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }

            if (searchTerm != null)
            {
                query = query
                    .Where(
                        p => (
                                p.Title
                                + " "
                                + p.YearOfIssue
                                + " "
                                + p.Genre.Name
                                + " "
                                + p.ShowInCinemasStartDate
                                + " "
                                + p.ShowInCinemasEndDate
                            )
                            .Contains(searchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<MovieDto> result = new PaginationResult<MovieDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}