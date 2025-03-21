import React, { useEffect, useState } from "react";
import { Book } from "./Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5267/api/book/GetBooks");
      const data = await response.json();
      setBooks(data);
    };
    fetchProjects();
  }, []);
  return (
    <>
      <h1>Books</h1>
      {books.map((b) => (
        <div id="BookCard">
          <h3>{b.title}</h3>
          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>ISBN: {b.isbn}</li>
            <li>Classification: {b.classification}</li>
            <li>Category: {b.category}</li>
            <li>Page Count: {b.pageCount}</li>
            <li>Price: {b.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
