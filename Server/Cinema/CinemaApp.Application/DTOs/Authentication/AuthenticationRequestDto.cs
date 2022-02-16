using System.ComponentModel.DataAnnotations;
using CinemaApp.Domain.Constants;

namespace CinemaApp.Application.DTOs.Authentication
{
    public class AuthenticationRequestDto
    {
        [Required]
        [EmailAddress]
        [StringLength(254)]
        public string Email { get; set; }
        
        [Required]
        [RegularExpression(ValidationPatterns.PasswordValidationPattern)]
        public string Password { get; set; }
    }
}