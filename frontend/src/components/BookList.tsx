import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  //set the variables
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // default the order by to book id
  const [orderBy, setOrderBy] = useState<string>("BookID");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define an asynchronous function to fetch the books data from the API
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          orderBy
        );
        console.log("API response:", data);
        // Update the state with the fetched books data
        setBooks(data.books);
        // Calculate and update the total number of pages
        setTotalPages(Math.ceil(data.totalBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetchProjects function to fetch the data
    loadBooks();
  }, [pageSize, pageNum, orderBy, selectedCategories]); // Re-run this effect whenever pageSize, pageNum, totalBooks, or orderBy changes
  if (loading) return <p>Loading books...</p>;
  return (
    <>
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Books</h1>

        <div className="row">
          {books.map((b) => (
            <div className="col-md-6 col-lg-4 mb-4" key={b.bookID}>
              <div className="card h-100 shadow border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.title}</h5>
                  <ul className="list-unstyled flex-grow-1">
                    <li>
                      <strong>Author:</strong> {b.author}
                    </li>
                    <li>
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li>
                      <strong>ISBN:</strong> {b.isbn}
                    </li>
                    <li>
                      <strong>Classification:</strong> {b.classification}
                    </li>
                    <li>
                      <strong>Category:</strong> {b.category}
                    </li>
                    <li>
                      <strong>Page Count:</strong> {b.pageCount}
                    </li>
                    <li>
                      <strong>Price:</strong> ${b.price.toFixed(2)}
                    </li>
                  </ul>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() =>
                      navigate(`/addToCart/${b.title}/${b.bookID}/${b.price}`)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination 
          pageNum={pageNum} 
          totalPages={totalPages} 
          pageSize={pageSize}
          orderBy={orderBy}
          setPageNum={setPageNum}
          setPageSize={setPageSize}
          setOrderBy={setOrderBy}/>
      </div>
    </>
  );
}

export default BookList;
