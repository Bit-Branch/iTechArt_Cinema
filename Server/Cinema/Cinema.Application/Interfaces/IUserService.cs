using CinemaApplication.Application.DTO;

namespace CinemaApplication.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> FindUserByEmailAsync(string email);

        Task<UserDto?> AuthenticateAsync(AuthenticationRequestDto credentials);

        Task<UserDto> CreateUserAsync(RegistrationRequestDto credentials);
    }
}