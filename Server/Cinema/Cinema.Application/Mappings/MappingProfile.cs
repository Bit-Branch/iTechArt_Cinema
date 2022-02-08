using AutoMapper;
using CinemaApplication.Application.DTO;
using CinemaApplication.Domain.Entities;

namespace CinemaApplication.Infrastructure.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateMovieDto, Movie>()
                .ForMember(
                    dest => dest.Cover,
                    opt => opt.MapFrom(
                        src => new BinaryReader(src.Cover.OpenReadStream())
                            .ReadBytes((int) src.Cover.Length)
                    )
                );

            CreateMap<CreateFavorDto, Favor>()
                .ForMember(
                    dest => dest.Image,
                    opt => opt.MapFrom(
                        src => new BinaryReader(src.Image.OpenReadStream())
                            .ReadBytes((int) src.Image.Length)
                    )
                );

            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<CreateGenreDto, Genre>();

            CreateMap<CityDto, City>().ReverseMap();
            CreateMap<CreateCityDto, City>();

            CreateMap<MovieDto, Movie>().ReverseMap();
            
            CreateMap<FavorDto, Favor>().ReverseMap();

            CreateMap<CinemaFavorDto, CinemaFavors>().ReverseMap();
            CreateMap<CreateCinemaFavorDto, CinemaFavors>();

            CreateMap<CinemaDto, Cinema>().ReverseMap();
            CreateMap<CreateCinemaDto, Cinema>();

            CreateMap<HallDto, Hall>().ReverseMap();
            CreateMap<CreateHallDto, Hall>();

            CreateMap<SeatDto, Seat>().ReverseMap();
            CreateMap<CreateSeatDto, Seat>();

            CreateMap<SeatTypeDto, SeatType>().ReverseMap();
        }
    }
}