using Cinema.Domain.Entities;
using Cinema.Service.DTO;

namespace Cinema.Service.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> FindUserByEmailAsync(UserCredsDto credentials);

        Task<UserDto> AuthenticateAsync(UserCredsDto credentials);

        Task<UserDto> CreateUserAsync(UserCredsDto credentials);
    }
}
