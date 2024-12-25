import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, resetCart } from "../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart());
  };

  return (
    <div className="text-white flex flex-col items-center">
      <h1 className="text-2xl font-semibold mt-10 mb-10">Cart</h1>
      <div>
        {cartItems.length > 0 ? (
          <div>
            <table className="border border-gray-500 border-separate border-spacing-x-32 border-spacing-y-5">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="flex items-center gap-2">
                      <img
                        src={`http://localhost:5000/${item.productImage}`}
                        className="w-10"
                        alt=""
                      />
                      {item.name}
                    </td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button onClick={handleRemoveItem}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <button onClick={handleClearCart}>Clear Cart</button>
            </table>
            <Link className="mt-5 text-pink-500">Checkout</Link>
          </div>
        ) : (
          <p className="text-gray-400 mt-5">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
