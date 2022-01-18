using Cinema.Domain.Entities;
using Cinema.Service.DTO;

namespace Cinema.Service.Interfaces
{
    public interface IJwtService
    {
        string CreateToken(UserDto user);
    }
}

