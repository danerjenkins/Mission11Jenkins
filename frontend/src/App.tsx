import "./App.css";
import AddToCart from "./pages/AddToCart";
import BooksPage from "./pages/BooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AdminBooksPage from "./pages/AdminBooksPage";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminBooksPage />} />
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/addToCart/:title/:bookId/:price" element={<AddToCart />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
