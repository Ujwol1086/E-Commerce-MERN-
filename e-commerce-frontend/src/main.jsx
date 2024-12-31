import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/Shop.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import SingleProduct from "./Pages/Products/SingleProduct.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SearchProduct from "./Pages/searchProduct.jsx";
import AddProduct from "./Pages/Admin/AddProduct.jsx";
import Order from "./Pages/Order/Order.jsx";
import AllUsers from "./Pages/Admin/AllUsers.jsx";
import AllProducts from "./Pages/Admin/AllProducts.jsx";
import Shipping from "./Pages/Order/Shipping.jsx";
import PlaceOrder from "./Pages/Order/PlaceOrder.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/singleproduct/:id" element={<SingleProduct />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/order" element={<Order />} />
      <Route path="/alluser" element={<AllUsers />} />
      <Route path="/allproduct" element={<AllProducts />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/allusers" element={<AllUsers />} />
      <Route path="/allproducts" element={<AllProducts/>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
