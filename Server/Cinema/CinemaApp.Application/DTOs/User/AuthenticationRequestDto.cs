using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.DTOs.Authentication
{
    public class AuthenticationRequestDto
    {
        [Required]
        [EmailAddress]
        [StringLength(254)]
        public string Email { get; set; }
        
        [Required]
        [RegularExpression(@"^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")]
        public string Password { get; set; }
    }
}