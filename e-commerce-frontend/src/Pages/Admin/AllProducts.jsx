import axios from "axios";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container text-center text-white">
      <h1 className="text-2xl font-semibold pt-16 mb-10">Products</h1>
      <div className="mt-10 flex items-center justify-center">
        <table className="border border-gray-500 border-separate border-spacing-x-32 border-spacing-y-5">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={products.id}>
                <td className="p-2 w-32 h-20 ">
                  <img
                    src={`http://localhost:5000/${product.productImage}`}
                    alt={product.name}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="space-x-10">
                  <button className="text-pink-500">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
