using Cinema.Application.DTO;

namespace Cinema.Application.Interfaces
{
    public interface IJwtService
    {
        string CreateToken(UserDto user);
    }
}

