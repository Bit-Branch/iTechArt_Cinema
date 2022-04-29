using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.DTOs.CinemaFavor;
using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.ExtensionMethods;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Infrastructure.Services
{
    public class CinemaService : ICinemaService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CinemaService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> CreateCinemaAsync(CreateCinemaDto createCinemaDto)
        {
            var cinema = _mapper.Map<Cinema>(createCinemaDto);

            await _context.Cinemas.AddAsync(cinema);

            await _context.SaveChangesAsync();

            return cinema.Id;
        }

        public async Task<int?> UpdateCinemaAsync(UpdateCinemaDto cinemaDto)
        {
            var updatedCinema = _mapper.Map<Cinema>(cinemaDto);

            var existingCinema = _context.Cinemas
                .Where(c => c.Id == cinemaDto.Id)
                .Include(c => c.Halls)
                .Include(c => c.CinemaFavors)
                .FirstOrDefault();

            if (existingCinema != null)
            {
                _context.Entry(existingCinema).CurrentValues.SetValues(updatedCinema);

                foreach (var existingCinemaFavor in existingCinema.CinemaFavors)
                {
                    if (!updatedCinema.CinemaFavors
                            .Any(
                                cf =>
                                    cf.CinemaId == existingCinemaFavor.CinemaId
                                    && cf.FavorId == existingCinemaFavor.FavorId
                            )
                       )
                    {
                        _context.CinemaFavors.Remove(existingCinemaFavor);
                    }
                }

                foreach (var updatedCinemaFavor in updatedCinema.CinemaFavors)
                {
                    var existingCinemaFavor = existingCinema.CinemaFavors
                        .SingleOrDefault(
                            c =>
                                c.CinemaId == updatedCinemaFavor.CinemaId
                                && c.FavorId == updatedCinemaFavor.FavorId
                        );

                    if (existingCinemaFavor != null)
                    {
                        _context.Entry(existingCinemaFavor).CurrentValues.SetValues(updatedCinemaFavor);
                    }
                    else
                    {
                        var newCinemaFavor = new CinemaFavors
                        {
                            CinemaId = updatedCinemaFavor.CinemaId,
                            FavorId = updatedCinemaFavor.FavorId,
                            Price = updatedCinemaFavor.Price
                        };
                        existingCinema.CinemaFavors.Add(newCinemaFavor);
                    }
                }

                await _context.SaveChangesAsync();

                return existingCinema.Id;
            }

            return null;
        }

        public async Task<CinemaDto?> GetCinemaByIdAsync(int id)
        {
            var cinema = await _context.Cinemas
                .Where(m => m.Id == id)
                .FirstOrDefaultAsync();

            return cinema != null ? _mapper.Map<CinemaDto>(cinema) : null;
        }

        public async Task<IEnumerable<CinemaDto>> GetAllAsync()
        {
            return await _context.Cinemas
                .Include(cinema => cinema.Halls)
                .ProjectTo<CinemaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<CinemaDto>> FindAllByTermAsync(string term)
        {
            return await _context.Cinemas
                .Where(f => f.Name.StartsWith(term))
                .ProjectTo<CinemaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<int> DeleteCinemaAsync(int id)
        {
            var cinema = _context.Cinemas.Remove(_context.Cinemas.Single(m => m.Id == id));

            await _context.SaveChangesAsync();

            return cinema.Entity.Id;
        }

        public async Task<PaginationResult<DisplayCinemaDto>> GetPagedAsync(
            int skip,
            int take,
            bool ascending,
            string? columnNameForOrdering,
            string? searchTerm
        )
        {
            IQueryable<Cinema> query;

            string? propertyNameForOrdering = null;

            if (columnNameForOrdering != null)
            {
                propertyNameForOrdering = columnNameForOrdering.CapitalizeFirstLetter();
            }

            if (ascending)
            {
                query = _context.Cinemas
                    .OrderBy(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }
            else
            {
                query = _context.Cinemas
                    .OrderByDescending(
                        p => EF.Property<object>(p, propertyNameForOrdering ?? nameof(p.Id))
                    );
            }

            if (searchTerm != null)
            {
                query = query
                    .Where(
                        p => (p.Name + " " + p.Address + " " + p.City.Name)
                            .Contains(searchTerm)
                    );
            }

            int totalCount = query.Count();

            PaginationResult<DisplayCinemaDto> result = new PaginationResult<DisplayCinemaDto>
            {
                TotalCountInDatabase = totalCount,
                Items = await query
                    .Skip(skip)
                    .Take(take)
                    .ProjectTo<DisplayCinemaDto>(_mapper.ConfigurationProvider)
                    .ToListAsync()
            };

            return result;
        }

        public async Task<IEnumerable<HallDto>> GetAllHallsByCinemaIdAsync(int cinemaId)
        {
            return await _context.Halls
                .Where(h => h.CinemaId == cinemaId)
                .ProjectTo<HallDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<CinemaFavorDto>> GetAllCinemaFavorsByCinemaIdAsync(int id)
        {
            return await _context.CinemaFavors
                .Where(c => c.CinemaId == id)
                .ProjectTo<CinemaFavorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}