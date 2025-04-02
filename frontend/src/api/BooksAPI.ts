import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

const API_URL = "https://book-project-jenkins-backend-3.azurewebsites.net/api/Book";
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  orderBy: string | "BookID"
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join("&");
    // Make a GET request to the API with the current page size, page number, and order by parameters
    const response = await fetch(
      `${API_URL}/GetBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&orderBy=${orderBy}${selectedCategories.length ? `&${categoryParams}` : ""}`,
      {
        credentials: "include", // Include credentials (cookies) in the request
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    // Parse the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error fetching books: ", error);
    throw error;
  }
};
export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Failed to add project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding project", error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error("Failed to update project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error update project", error);
    throw error;
  }
};
export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to deleting project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting project", error);
    throw error;
  }
};
