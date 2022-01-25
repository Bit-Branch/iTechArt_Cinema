﻿using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Cinema.Domain.Settings;
using Cinema.Application.DTO;
using Cinema.Application.Interfaces;

namespace Cinema.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtSettings _options;

        public JwtService(IOptions<JwtSettings> options)
        {
            _options = options.Value;
        }

        public string CreateToken(UserDto user)
        { 
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name,user.Email),
                new(ClaimTypes.Role, user.Role),
                new(ClaimTypes.Sid, user.Id.ToString())
            };
            
            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecurityKey)), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _options.Issuer,
                Audience = _options.Audience,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(_options.ExpireIn),
                SigningCredentials = credentials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}