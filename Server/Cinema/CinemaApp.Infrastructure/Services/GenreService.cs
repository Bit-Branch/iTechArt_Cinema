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
            var genreToRemove = _context.Genres.FirstOrDefault(m => m.Id == id);

            if (genreToRemove == null)
            {
                return -1;
            }

            _context.Genres.Remove(genreToRemove);

            await _context.SaveChangesAsync();

            return genreToRemove.Id;
        }

        public async Task<IEnumerable<GenreDto>> GetAllAsync()
        {
            return await _context.Genres
                .ProjectTo<GenreDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PaginationResult<GenreDto>> GetPagedAsync(PaginationRequest paginationRequest)
        {
            IQueryable<Genre> query;

            string? propertyNameForOrdering = null;

            if (paginationRequest.SortingColumn != null)
            {
                propertyNameForOrdering = paginationRequest.SortingColumn.CapitalizeFirstLetter();
            }

            if (paginationRequest.Ascending)
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

            if (paginationRequest.SearchTerm != null)
            {
                query = query
                    .Where(
                        p => p.Name.Contains(paginationRequest.SearchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<GenreDto> result = new PaginationResult<GenreDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(paginationRequest.Page * paginationRequest.PageSize)
                    .Take(paginationRequest.PageSize)
                    .ProjectTo<GenreDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}