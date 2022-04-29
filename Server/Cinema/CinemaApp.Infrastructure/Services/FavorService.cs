using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Application.ExtensionMethods;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
{
    public class FavorService : IFavorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FavorService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateFavorAsync(CreateFavorDto createFavorDto)
        {
            var favor = _mapper.Map<Favor>(createFavorDto);

            await _context.Favors.AddAsync(favor);

            await _context.SaveChangesAsync();

            return favor.Id;
        }

        public async Task<int> UpdateFavorAsync(UpdateFavorDto favorDto)
        {
            var favor = _mapper.Map<Favor>(favorDto);

            _context.Favors.Update(favor);

            await _context.SaveChangesAsync();

            return favor.Id;
        }

        public async Task<IEnumerable<FavorDto>> GetAllAsync()
        {
            return await _context.Favors
                .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<FavorDto>> FindAllByTermAsync(string term)
        {
            return await _context.Favors
                .Where(f => f.Name.StartsWith(term))
                .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<int> DeleteFavorAsync(int id)
        {
            var favor = _context.Favors.Remove(_context.Favors.Single(m => m.Id == id));

            await _context.SaveChangesAsync();

            return favor.Entity.Id;
        }

        public async Task<PaginationResult<FavorDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<Favor> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.Favors
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.Favors
                    .OrderByDescending(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }

            if (searchTerm != null)
            {
                query = query
                    .Where(
                        p => (p.Name + " " + p.Description)
                            .Contains(searchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<FavorDto> result = new PaginationResult<FavorDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}