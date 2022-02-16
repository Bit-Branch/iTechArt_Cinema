using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.City;
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

        public bool CheckForDuplicates(CreateCityDto createCityDto)
        {
            return _context.Cities
                .Any(c => c.Name.ToLower() == createCityDto.Name.ToLower());
        }
    }
}