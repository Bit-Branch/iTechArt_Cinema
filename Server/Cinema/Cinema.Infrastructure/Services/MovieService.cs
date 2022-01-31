using AutoMapper;
using Cinema.Application.DTO;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Infrastructure.Contexts;

namespace Cinema.Infrastructure.Services;

public class MovieService : IMovieService
{
    private readonly ApplicationDbContext _context;

    public MovieService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateMovieAsync(CreateMovieDto createMovieDto)
    {
        var movie = new Movie
        {
            Cover = Convert.FromBase64String(createMovieDto.Cover),
            Description = createMovieDto.Description,
            DurationInMinutes = createMovieDto.DurationInMinutes,
            EndDate = createMovieDto.EndDate,
            Genre = createMovieDto.Genre,
            StartDate = createMovieDto.StartDate,
            Title = createMovieDto.Title
        };

        await _context.Movies.AddAsync(movie);

        await _context.SaveChangesAsync();

        return movie.Id;
    }
}