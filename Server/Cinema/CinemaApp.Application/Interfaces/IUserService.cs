using CinemaApp.Application.DTOs.Authentication;
using CinemaApp.Application.DTOs.User;

namespace CinemaApp.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> FindUserByEmailAsync(string email);

        Task<UserDto?> AuthenticateAsync(AuthenticationRequestDto credentials);

        Task<UserDto> CreateUserAsync(RegistrationRequestDto credentials);
    }
}