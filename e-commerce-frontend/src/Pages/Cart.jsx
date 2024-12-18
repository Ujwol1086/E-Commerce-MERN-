import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  return (
    <div className="text-white flex flex-col items-center">
      <h1 className="text-2xl font-semibold mt-10 mb-10">Cart</h1>
      <div>
        {cartItems.length > 0 ? (
          <table className="border border-gray-500 border-separate border-spacing-x-32 border-spacing-y-5">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <button onClick={handleClearCart}>Clear Cart</button>
          </table>
        ) : (
          <p className="text-gray-400 mt-5">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
