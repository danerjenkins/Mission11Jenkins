import React, { useEffect, useState } from "react";
import { Book } from "./Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>("BookID");

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:5267/api/book/GetBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&orderBy=${orderBy}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalBooks(data.totalBooks);
      setTotalPages(Math.ceil(totalBooks / pageSize));
    };
    fetchProjects();
  }, [pageSize, pageNum, totalBooks, orderBy]);
  // set function to toggle sort
  const toggleSort = () => {
    setOrderBy((prev) => (prev === "Title" ? "BookID" : "Title")); // if you're using Dynamic LINQ
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
          </div>
        </div>
      ))}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
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
      <button onClick={toggleSort}>Toggle Sort</button>
    </>
  );
}

export default BookList;
