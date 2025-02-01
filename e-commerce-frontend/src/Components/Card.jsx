import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = () => {
  const [products, setProducts] = useState([]);
  // const token = JSON.parse(localStorage.getItem("userInfo")).token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/product"
          // , {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          //   }
        );
        // const category = await axios.get("http://localhost:5000/api/category", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        //sort product randomly
        const shuffledProduct = res.data.sort(() => 0.5 - Math.random());
        setProducts(shuffledProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
        >
          <Link to={`/singleproduct/${product.id}`}>
            <img
              className="w-full h-60 rounded-t-lg object-cover hover:scale-105 duration-300"
              src={`http://localhost:5000/${product.productImage}`}
              alt={product.name}
            />
          </Link>
          <div className="p-2">
            <Link to={`/singleproduct/${product.id}`}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
            </Link>
            <div className="flex items-center mt-2 mb-4">
              <span className="font-medium text-gray-500 dark:text-gray-400">
                {product.category.name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-10">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <Link
                to={`/singleproduct/${product._id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
