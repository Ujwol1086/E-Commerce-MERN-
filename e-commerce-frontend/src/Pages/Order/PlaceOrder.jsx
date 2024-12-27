import { Link } from "react-router-dom";
// import Message from "../../components/Message";
import ProgressSteps from "../../Components/ProgressSteps";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="w-full mx-auto mt-10 pl-20 text-white">
        {cart.cartItems.length === 0 ? (
          <h1>Cart is empty</h1>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={`http://localhost:5000/${item.productImage}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      $ {(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 w-[90%]">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818]">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span>
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span>
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span>
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span>
              </li>
            </ul>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong>{" "}
              <span className="text-purple-500 font-bold">
                <Link>Khalti</Link>
              </span>
            </div>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
