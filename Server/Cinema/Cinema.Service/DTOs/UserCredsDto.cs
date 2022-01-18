using System.ComponentModel.DataAnnotations;

namespace Cinema.Service.DTO
{
    public class UserCredsDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
