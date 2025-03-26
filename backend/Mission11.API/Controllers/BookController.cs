using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;
using System.Linq.Dynamic.Core;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BooksContext _context;
        //get access to the database
        public BookController(BooksContext context)
        {
            _context = context;
        }
        [HttpGet("GetBooks")]
        public IActionResult Get(int pageHowMany, int pageNum, string orderBy, [FromQuery] List<string>? bookCategories = null)
        {
            var query =_context.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }
            //cookies for is 414
            string? favoriteBook = Request.Cookies["favoriteBook"];
            Console.WriteLine("**************Cookie***********\n" + favoriteBook);
            HttpContext.Response.Cookies.Append("favoriteBook", "Les Miserables", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = System.DateTime.Now.AddMinutes(1)
            });
            //end of cookies
            //if no order by is givec default to BookID

            var sortBy = string.IsNullOrEmpty(orderBy) ? "BookID" : orderBy;
            //get the books from the database
            var results = query
                .OrderBy(sortBy)
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();
            //return the books with the count of books being returned
            var allResults = new
            {
                books = results,
                totalBooks = query.Count()
            };
            return Ok(allResults);
        }
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            //get the categories from the database
            var results = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            //return the categories
            return Ok(results);
        }   
    }
}
