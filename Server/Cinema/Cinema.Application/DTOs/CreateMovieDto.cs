using System.ComponentModel.DataAnnotations;

namespace Cinema.Application.DTO;

public class CreateMovieDto
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; }
    public string Cover { get; set; }
    [Required]
    [StringLength(1000)]
    public string Description { get; set; }
    [Required] public string Genre { get; set; }
    [Required] public DateTime StartDate { get; set; }
    [Required] public DateTime EndDate { get; set; }
    [Required] public int DurationInMinutes { get; set; }
}