﻿using Microsoft.EntityFrameworkCore;
using Cinema.Application.DTO;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Cinema.Infrastructure.Contexts;

namespace Cinema.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> CreateUserAsync(AuthenticationRequestDto credentials)
        {
            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            
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

        public async Task<UserDto> FindUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
            
            return user != null ? new UserDto { Id = user.Id, Email = user.Email, Role = user.Role } : null;
        }

        public async Task<UserDto> AuthenticateAsync(AuthenticationRequestDto credentials)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == credentials.Email);

            if (user != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(credentials.Password, user.PasswordHash);
                if (verified)
                {
                    return new UserDto { Id = user.Id, Email = user.Email, Role = user.Role };
                }
            }
            return null;
        }
    }
}
