using AutoMapper;
using CinemaApp.Domain.Entities;
using CinemaApp.Application.DTOs.Cinema;
using CinemaApp.Application.DTOs.CinemaFavor;
using CinemaApp.Application.DTOs.City;
using CinemaApp.Application.DTOs.Favor;
using CinemaApp.Application.DTOs.Genre;
using CinemaApp.Application.DTOs.Hall;
using CinemaApp.Application.DTOs.Movie;
using CinemaApp.Application.DTOs.MovieSession;
using CinemaApp.Application.DTOs.Seat;
using CinemaApp.Application.DTOs.SeatType;
using CinemaApp.Application.DTOs.TicketPrice;

namespace CinemaApp.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Genre, GenreDto>();
            CreateMap<CreateGenreDto, Genre>();

            CreateMap<City, CityDto>();
            CreateMap<CreateCityDto, City>();

            CreateMap<Movie, MovieDto>();
            CreateMap<CreateMovieDto, Movie>();

            CreateMap<Favor, FavorDto>();
            CreateMap<CreateFavorDto, Favor>();

            CreateMap<CinemaFavors, CinemaFavorDto>();
            CreateMap<CreateCinemaFavorDto, CinemaFavors>();

            CreateMap<Cinema, CinemaDto>();
            CreateMap<CreateCinemaDto, Cinema>();

            CreateMap<Hall, HallDto>();
            CreateMap<CreateHallDto, Hall>();

            CreateMap<Seat, SeatDto>();
            CreateMap<CreateSeatDto, Seat>();

            CreateMap<SeatType, SeatTypeDto>();
            CreateMap<CreateSeatTypeDto, SeatType>();

            CreateMap<CreateTicketPriceDto, TicketPrice>();
            CreateMap<TicketPrice, TicketPriceDto>();

            CreateMap<CreateMovieSessionDto, MovieSession>();
        }
    }
}