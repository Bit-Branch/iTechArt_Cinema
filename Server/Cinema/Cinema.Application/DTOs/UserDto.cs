using Cinema.Application.Enums;

namespace Cinema.Application.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public Roles Role { get; set; }
    }
}
