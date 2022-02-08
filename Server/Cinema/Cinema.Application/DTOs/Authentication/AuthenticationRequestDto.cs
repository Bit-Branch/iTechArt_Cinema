using System.ComponentModel.DataAnnotations;
using CinemaApplication.Domain.Constants;

namespace CinemaApplication.Application.DTO
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