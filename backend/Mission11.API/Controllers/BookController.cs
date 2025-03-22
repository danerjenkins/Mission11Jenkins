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
        public IActionResult Get(int pageHowMany, int pageNum, string orderBy)
        {
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
            var results = _context.Books
                .OrderBy(sortBy)
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();
            //return the books with the count of books being returned
            var allResults = new
            {
                books = results,
                totalBooks = _context.Books.Count()
            };
            return Ok(allResults);
        }
    }
}
