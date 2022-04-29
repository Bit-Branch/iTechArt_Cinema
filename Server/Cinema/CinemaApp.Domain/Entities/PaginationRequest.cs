namespace CinemaApp.Domain.Entities
{
    public class PaginationRequest
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public bool Ascending { get; set; }
        public string? SortingColumn { get; set; }
        public string? SearchTerm { get; set; }
    }
}