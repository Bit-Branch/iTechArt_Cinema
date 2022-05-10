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
            CreateMap<UpdateGenreDto, Genre>();

            CreateMap<City, CityDto>();
            CreateMap<CreateCityDto, City>();
            CreateMap<UpdateCityDto, City>();

            CreateMap<Movie, MovieDto>();
            CreateMap<Movie, SearchMovieDto>();
            CreateMap<CreateMovieDto, Movie>();
            CreateMap<UpdateMovieDto, Movie>();

            CreateMap<Favor, FavorDto>();
            CreateMap<CreateFavorDto, Favor>();
            CreateMap<UpdateFavorDto, Favor>();

            CreateMap<CinemaFavors, CinemaFavorDto>();
            CreateMap<CreateCinemaFavorDto, CinemaFavors>();
            CreateMap<UpdateCinemaFavorDto, CinemaFavors>();

            CreateMap<Cinema, CinemaDto>();
            CreateMap<Cinema, SearchCinemaDto>()
                .ForMember(dest => dest.CityName, opt => opt.MapFrom(src => src.City.Name));
            CreateMap<Cinema, DisplayCinemaDto>();
            CreateMap<CreateCinemaDto, Cinema>();
            CreateMap<UpdateCinemaDto, Cinema>();

            CreateMap<Hall, HallDto>()
                .ForMember(dest => dest.SeatingPlan, opt => opt.MapFrom(src => src.SeatingPlan ?? ""));
            CreateMap<CreateHallDto, Hall>();
            CreateMap<UpdateHallDto, Hall>();

            CreateMap<Seat, SeatDto>();
            CreateMap<CreateSeatDto, Seat>();
            CreateMap<UpdateSeatDto, Seat>();

            CreateMap<SeatType, SeatTypeDto>();
            CreateMap<CreateSeatTypeDto, SeatType>();
            CreateMap<UpdateSeatTypeDto, SeatType>();

            CreateMap<TicketPrice, TicketPriceDto>();
            CreateMap<CreateTicketPriceDto, TicketPrice>();
            CreateMap<UpdateTicketPriceDto, TicketPrice>();

            CreateMap<MovieSession, MovieSessionDto>();
            CreateMap<CreateMovieSessionDto, MovieSession>();
            CreateMap<UpdateMovieSessionDto, MovieSession>();
            CreateMap<MovieSession, DisplayMovieSessionDto>()
                .ForMember(dest => dest.MovieName, opt => opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.Name))
                .ForMember(dest => dest.CinemaName, opt => opt.MapFrom(src => src.Hall.Cinema.Name));
        }
    }
}