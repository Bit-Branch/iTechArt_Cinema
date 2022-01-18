using Cinema.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Infrastructure.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
