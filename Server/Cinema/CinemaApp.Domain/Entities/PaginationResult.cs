namespace CinemaApp.Domain.Entities
{
    public class PaginationResult<T>
    {
        public int TotalCountInDatabase { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}