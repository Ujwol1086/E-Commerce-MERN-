import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  // To Initialize as an object use "useState({})" and to initialize as an array use "useState([])"
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(product));
    toast.success("Product successfully added to cart");
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/product/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  return (
    <div className="text-white flex flex-wrap justify-center gap-10 ">
      <div className="w-[20%] mt-10">
        <img src={`http://localhost:5000/${product.productImage}`} />
      </div>
      <div className="w-[40%] mt-10 flex flex-col gap-10">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button
          className="text-white w-[30%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={addToCartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
