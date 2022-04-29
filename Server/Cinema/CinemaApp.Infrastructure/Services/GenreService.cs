using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Genre;
using CinemaApp.Application.ExtensionMethods;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
{
    public class GenreService : IGenreService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GenreService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateGenreAsync(CreateGenreDto createGenreDto)
        {
            var genre = _mapper.Map<Genre>(createGenreDto);

            await _context.Genres.AddAsync(genre);

            await _context.SaveChangesAsync();

            return genre.Id;
        }

        public async Task<int> UpdateGenreAsync(UpdateGenreDto genreDto)
        {
            var genre = _mapper.Map<Genre>(genreDto);

            _context.Genres.Update(genre);

            await _context.SaveChangesAsync();

            return genre.Id;
        }

        public async Task<int> DeleteGenreAsync(int id)
        {
            var genre = _context.Genres.Remove(_context.Genres.Single(g => g.Id == id));

            await _context.SaveChangesAsync();

            return genre.Entity.Id;
        }

        public async Task<IEnumerable<GenreDto>> GetAllAsync()
        {
            return await _context.Genres
                .ProjectTo<GenreDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PaginationResult<GenreDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<Genre> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.Genres
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.Genres
                    .OrderByDescending(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }

            if (searchTerm != null)
            {
                query = query
                    .Where(
                        p => p.Name.Contains(searchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<GenreDto> result = new PaginationResult<GenreDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<GenreDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}