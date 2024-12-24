import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product");
        const category = await fetch("http://localhost:5000/api/category");
        const categoryData = await category.json();
        const data = await res.json();
        setProducts(categoryData && data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/singleproduct/${product.id}`}>
            <img
              className="p-8 rounded-t-lg"
              src={`http://localhost:5000/${product.productImage}`}
              alt={product.name}
            />
          </Link>
          <div className="px-5 pb-5">
            <Link to={`/singleproduct/${product.id}`}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.title}
              </h5>
            </Link>
            <div className="flex items-center mt-2.5 mb-4">
              <span className="font-medium text-gray-500 dark:text-gray-400">
                {product.category.name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-10">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <Link
                to={`/singleproduct/${product.id}`}
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
