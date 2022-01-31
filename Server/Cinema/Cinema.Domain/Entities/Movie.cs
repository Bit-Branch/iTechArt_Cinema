namespace Cinema.Domain.Entities;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public byte[] Cover { get; set; }
    public string Description { get; set; }
    public string Genre { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int DurationInMinutes { get; set; }
}