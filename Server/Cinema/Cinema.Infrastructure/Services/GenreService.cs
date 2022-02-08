using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApplication.Application.DTO;
using CinemaApplication.Application.Interfaces;
using CinemaApplication.Domain.Entities;
using CinemaApplication.Infrastructure.Contexts;

namespace CinemaApplication.Infrastructure.Services
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

        public async Task<List<GenreDto>> GetAllAsync()
        {
            return await _context.Genres
                .ProjectTo<GenreDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}