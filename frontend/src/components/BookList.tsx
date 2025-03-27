import React, { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  //set the variables
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  // default the order by to book id
  const [orderBy, setOrderBy] = useState<string>("BookID");
  const navigate = useNavigate();

  useEffect(() => {
    // Define an asynchronous function to fetch the books data from the API
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join("&");
      // Make a GET request to the API with the current page size, page number, and order by parameters
      const response = await fetch(
        `http://localhost:5000/api/book/GetBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&orderBy=${orderBy}${selectedCategories.length ? `&${categoryParams}` : ""}`,
        {
          credentials: "include", // Include credentials (cookies) in the request
        }
      );
      // Parse the JSON response
      const data = await response.json();
      console.log("API response:", data);
      // Update the state with the fetched books data
      setBooks(data.books);
      // Update the total number of books
      setTotalBooks(data.totalBooks);
      // Calculate and update the total number of pages
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    };
    // Call the fetchProjects function to fetch the data
    fetchProjects();
  }, [pageSize, pageNum, totalBooks, orderBy, selectedCategories]); // Re-run this effect whenever pageSize, pageNum, totalBooks, or orderBy changes
  // set function to toggle sort
  const toggleSort = () => {
    setOrderBy((prev) => (prev === "Title" ? "BookID" : "Title"));
  };
  return (
    <>
      <h1>Books</h1>
      {books.map((b) => (
        <div id="BookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
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
                <strong>Price:</strong> {b.price}
              </li>
            </ul>
            <button className="btn btn-success"
             onClick={() => navigate(`/addToCart/${b.title}/${b.bookID}/${b.price}`)}>Add to Cart</button>
          </div>
        </div>
      ))}
      {/* previous button */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/* pages buttons */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      {/* next button */}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      {/* button to change the number of results */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      {/* button to toggle whether it is sorted or not */}
      <button onClick={toggleSort}>Toggle Sort</button>
    </>
  );
}

export default BookList;
