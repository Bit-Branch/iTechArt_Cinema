using Cinema.Domain.Entities;
using Cinema.Domain.Settings;
using Cinema.Service.DTO;
using Cinema.Service.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Cinema.Service
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
               new Claim(ClaimTypes.Name,user.Email),
               new Claim(ClaimTypes.Role, user.Role),
               new Claim(ClaimTypes.Sid, user.Id.ToString())
           };

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecurityKey)), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _options.Issuer,
                Audience = _options.Audience,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(_options.ExpiryInMinutes),
                SigningCredentials = credentials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
