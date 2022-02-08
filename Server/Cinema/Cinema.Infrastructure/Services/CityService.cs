using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Entities;
using CinemaApplication.Infrastructure.Contexts;

namespace CinemaApplication.Infrastructure.Services
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

        public async Task<List<CityDto>> GetAllAsync()
        {
            return await _context.Cities
                .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}