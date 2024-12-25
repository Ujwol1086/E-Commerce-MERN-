import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product");
        const data = await res.json();
        //this is used to sort the products randomly
        const shuffled = data.sort(() => 0.5 - Math.random());

        //this is used to get the top 10 prosucts after the products are randomly sorted from the previous step
        const randomProducts = shuffled.slice(0, 8);

        setProducts(randomProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-center text-3xl font-semibold mt-10 mb-10">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="w-full h-60 rounded-t-lg object-cover hover:scale-105 duration-300"
                src={`http://localhost:5000/${product.productImage}`}
                alt={product.name}
              />
              <div className="px-5 pb-5 space-y-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <div className="flex justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <Link
                    to={`/singleproduct/${product.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
