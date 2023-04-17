using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<User>? User { get; set; }
        public DbSet<Notes>? Notes { get; set; }
    }
}