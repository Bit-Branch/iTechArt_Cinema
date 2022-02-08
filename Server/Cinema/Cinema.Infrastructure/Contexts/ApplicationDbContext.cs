using Microsoft.EntityFrameworkCore;
using CinemaApplication.Domain.Entities;

namespace CinemaApplication.Infrastructure.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Favor> Favors { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<SeatType> SeatTypes { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<CinemaFavors> CinemaFavors { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TicketPrice>()
                .HasKey(tp => new { tp.MovieSessionId, tp.SeatTypeId });
            modelBuilder.Entity<CinemaFavors>()
                .HasKey(cf => new { cf.CinemaId, cf.FavorId });
            modelBuilder.Entity<TicketSeat>()
                .HasKey(ts => new { ts.SeatId, ts.TicketId });
            modelBuilder.Entity<Genre>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
        }
    }
}