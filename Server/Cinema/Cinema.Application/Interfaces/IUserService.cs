using Cinema.Application.DTO;

namespace Cinema.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> FindUserByEmailAsync(string email);

        Task<UserDto> AuthenticateAsync(UserCredentialsDto credentials);

        Task<UserDto> CreateUserAsync(UserCredentialsDto credentials);
    }
}
