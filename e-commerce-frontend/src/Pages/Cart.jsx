import { useDispatch, useSelector } from "react-redux";
import {
  decreasedQuantity,
  increasedQuantity,
  resetCart,
} from "../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const navigate = useNavigate();
  const shippingDetails = useSelector(
    (state) => state.shipping.shippingDetails
  );

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increasedQuantity(id));
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreasedQuantity(id));
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
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="flex items-center gap-2">
                      <img
                        src={`http://localhost:5000/${item.productImage}`}
                        className="w-10"
                        alt=""
                      />
                      {item.name}
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button
                        className="p-2"
                        onClick={() => handleDecreaseQuantity(item._id)}
                      >
                        {" "}
                        -{" "}
                      </button>
                      {item.quantity}
                      <button
                        className="p-2"
                        onClick={() => {
                          handleIncreaseQuantity(item._id);
                        }}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <button onClick={handleClearCart}>Clear Cart</button>
            </table>
            <Link
              to={shippingDetails ? "/placeorder" : "/shipping"}
              className="mt-5 text-pink-500"
            >
              Checkout
            </Link>
          </div>
        ) : (
          <p className="text-gray-400 mt-5">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
