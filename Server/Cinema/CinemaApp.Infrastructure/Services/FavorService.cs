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
            var favorToRemove = _context.Favors.FirstOrDefault(m => m.Id == id);

            if (favorToRemove == null)
            {
                return -1;
            }

            _context.Favors.Remove(favorToRemove);

            await _context.SaveChangesAsync();

            return favorToRemove.Id;
        }

        public async Task<PaginationResult<FavorDto>> GetPagedAsync(PaginationRequest paginationRequest)
        {
            IQueryable<Favor> query;

            string? propertyNameForOrdering = null;

            if (paginationRequest.SortingColumn != null)
            {
                propertyNameForOrdering = paginationRequest.SortingColumn.CapitalizeFirstLetter();
            }

            if (paginationRequest.Ascending)
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

            if (paginationRequest.SearchTerm != null)
            {
                query = query
                    .Where(
                        p => (p.Name + " " + p.Description)
                            .Contains(paginationRequest.SearchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<FavorDto> result = new PaginationResult<FavorDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(paginationRequest.Page * paginationRequest.PageSize)
                    .Take(paginationRequest.PageSize)
                    .ProjectTo<FavorDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}