import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  return (
    <div>
      <h2> Your Cart </h2>
      <div>
        {cart.length === 0 ? (
          <p>Your're cart is empty</p>
        ) : (
            <table className="table table-striped table-bordered mt-4">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookId}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.bookId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <h3><strong>Total: {cart.reduce((sum,item) => sum + item.subtotal,0).toFixed(2)} </strong></h3>
      <button>Checkout</button>
      <button onClick={() => navigate("/books")}>Continue Browsing</button>
    </div>
  );
}
export default CartPage;
