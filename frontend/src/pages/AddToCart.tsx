import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function AddToCart() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "No book found",
      quantity,
      price: Number(price),
      subtotal,
    };
    addToCart(newItem);
    navigate("/cart");
  };
  return (
    <>
      <WelcomeBand />
      <h2> {title} </h2>
      <h4>Price: {price}</h4>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(x) => {
            setQuantity(Number(x.target.value))
            setSubtotal(Number(x.target.value)*Number(price))}}
        />
        <button onClick={handleAddToCart}>Add to cart</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}
export default AddToCart;
