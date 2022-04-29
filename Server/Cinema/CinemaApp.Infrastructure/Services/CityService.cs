using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.ExtensionMethods;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
{
    public class CityService : ICityService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CityService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateCityAsync(CreateCityDto createCityDto)
        {
            var city = _mapper.Map<City>(createCityDto);

            await _context.Cities.AddAsync(city);

            await _context.SaveChangesAsync();

            return city.Id;
        }

        public async Task<int> UpdateCityAsync(UpdateCityDto cityDto)
        {
            var city = _mapper.Map<City>(cityDto);

            _context.Cities.Update(city);

            await _context.SaveChangesAsync();

            return city.Id;
        }

        public async Task<int> DeleteCityAsync(int id)
        {
            var city = _context.Cities.Remove(_context.Cities.Single(g => g.Id == id));

            await _context.SaveChangesAsync();

            return city.Entity.Id;
        }

        public async Task<IEnumerable<CityDto>> GetAllAsync()
        {
            return await _context.Cities
                .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<CityDto>> FindAllByTermAsync(string term)
        {
            return await _context.Cities
                .Where(c => c.Name.StartsWith(term))
                .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public bool DuplicatesExists(string cityName)
        {
            return _context.Cities
                .Any(c => c.Name.ToLower() == cityName.ToLower());
        }

        public async Task<PaginationResult<CityDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<City> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.Cities
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.Cities
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

            PaginationResult<CityDto> result = new PaginationResult<CityDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}