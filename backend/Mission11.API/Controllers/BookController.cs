using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BooksContext _context;
        public BookController(BooksContext context)
        {
            _context = context;
        }
        [HttpGet("GetBooks")]
        public IEnumerable<Book> Get()
        {
            return _context.Books.ToList();
        }
        [HttpGet("GetOrderedBooks")]
        public IEnumerable<Book> GetOrdered()
        {
            return _context.Books.OrderBy(b => b.Title).ToList();
        }
    }
}
