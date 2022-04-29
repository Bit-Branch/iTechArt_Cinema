using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Application.ExtensionMethods;
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

        public async Task<int> UpdateSeatTypeAsync(UpdateSeatTypeDto seatTypeDto)
        {
            var seatType = _mapper.Map<SeatType>(seatTypeDto);

            _context.SeatTypes.Update(seatType);

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

        public async Task<int> DeleteSeatTypeAsync(int id)
        {
            var seatType = _context.SeatTypes.Remove(_context.SeatTypes.Single(st => st.Id == id));

            await _context.SaveChangesAsync();

            return seatType.Entity.Id;
        }

        public async Task<PaginationResult<SeatTypeDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<SeatType> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.SeatTypes
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.SeatTypes
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

            PaginationResult<SeatTypeDto> result = new PaginationResult<SeatTypeDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<SeatTypeDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }
    }
}