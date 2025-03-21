using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data
{
    public class BooksContext : DbContext
    {
        public BooksContext(DbContextOptions<BooksContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
    }
}
