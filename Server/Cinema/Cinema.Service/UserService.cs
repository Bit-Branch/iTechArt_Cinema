using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Cinema.Infrastructure.Contexts;
using Cinema.Service.DTO;
using Cinema.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Service
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> CreateUserAsync(UserCredsDto credentials)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(credentials.Password, salt);

            User user = new User
            {
                Email = credentials.Email,
                PasswordHash = hashedPassword,
                Role = Roles.User.ToString()
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new UserDto { Id = user.Id, Email = user.Email, Role = user.Role };
        }

        public async Task<UserDto> FindUserByEmailAsync(UserCredsDto credentials)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == credentials.Email);
            return user != null ? new UserDto { Id = user.Id, Email = user.Email, Role = user.Role } : null;
        }

        public async Task<UserDto> AuthenticateAsync(UserCredsDto credentials)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == credentials.Email);

            if (user != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(credentials.Password, user.PasswordHash);
                if(verified)
                {
                    return new UserDto { Id = user.Id, Email = user.Email, Role = user.Role };
                }
            }
            return null;
        }


    }
}
