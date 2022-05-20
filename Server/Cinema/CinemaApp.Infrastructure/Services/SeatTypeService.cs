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
            var seatTypeToRemove = _context.SeatTypes.FirstOrDefault(m => m.Id == id);

            if (seatTypeToRemove == null)
            {
                return -1;
            }

            _context.SeatTypes.Remove(seatTypeToRemove);

            await _context.SaveChangesAsync();

            return seatTypeToRemove.Id;
        }

        public async Task<PaginationResult<SeatTypeDto>> GetPagedAsync(PaginationRequest paginationRequest)
        {
            IQueryable<SeatType> query;

            string? propertyNameForOrdering = null;

            if (paginationRequest.SortingColumn != null)
            {
                propertyNameForOrdering = paginationRequest.SortingColumn.CapitalizeFirstLetter();
            }

            if (paginationRequest.Ascending)
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

            if (paginationRequest.SearchTerm != null)
            {
                query = query
                    .Where(
                        p => p.Name.Contains(paginationRequest.SearchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<SeatTypeDto> result = new PaginationResult<SeatTypeDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(paginationRequest.Page * paginationRequest.PageSize)
                    .Take(paginationRequest.PageSize)
                    .ProjectTo<SeatTypeDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }

        public async Task<SeatTypeDto?> GetSeatTypeByIdAsync(int id)
        {
            var seatType = await _context.SeatTypes
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            return seatType != null ? _mapper.Map<SeatTypeDto>(seatType) : null;
        }
    }
}