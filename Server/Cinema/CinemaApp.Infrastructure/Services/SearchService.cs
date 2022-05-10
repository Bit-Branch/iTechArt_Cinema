using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.DTOs.Search;
using CinemaApp.Infrastructure.Contexts;

namespace CinemaApp.Infrastructure.Services;

public class SearchService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public SearchService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<MultipleSearchResult> SearchMoviesCinemasCitiesAsync(string term)
    {
        return new MultipleSearchResult
        {
            Movies = await _context.Movies
                .Where(f => f.Title.StartsWith(term))
                .ProjectTo<SearchMovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync(),
            Cinemas = await _context.Cinemas
                .Where(f => f.Name.StartsWith(term))
                .ProjectTo<SearchCinemaDto>(_mapper.ConfigurationProvider)
                .ToListAsync(),
            Cities = await _context.Cities
                .Where(f => f.Name.StartsWith(term))
                .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
                .ToListAsync()
        };
    }
}