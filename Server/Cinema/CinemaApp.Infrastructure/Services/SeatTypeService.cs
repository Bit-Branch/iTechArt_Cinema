using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Infrastructure.Services
{
    public class SeatTypeService : ISeatTypeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SeatTypeService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateSeatTypeAsync(CreateSeatTypeDto createSeatTypeDto)
        {
            var seatType = _mapper.Map<SeatType>(createSeatTypeDto);

            await _context.SeatTypes.AddAsync(seatType);

            await _context.SaveChangesAsync();

            return seatType.Id;
        }

        public async Task<IEnumerable<SeatTypeDto>> GetAllAsync()
        {
            return await _context.SeatTypes
                .ProjectTo<SeatTypeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<SeatTypeDto>> FindAllByTermAsync(string term)
        {
            return await _context.SeatTypes
                .Where(st => st.Name.StartsWith(term))
                .ProjectTo<SeatTypeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}