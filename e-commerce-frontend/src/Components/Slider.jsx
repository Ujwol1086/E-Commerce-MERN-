import { useEffect, useState } from "react";

const Slider = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };
  return (
    <div className="relative w-full bg-gray-100 p-4 rounded-lg">
      {/* Slider Container */}
      <div className="flex justify-center items-center space-x-4">
        {products.length > 0 && (
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="p-4 rounded-t-lg h-96 w-full object-contain"
              src={`http://localhost:5000/${products[currentIndex].productImage}`}
            />
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        &#8594;
      </button>
      {/* special/featuredProducts */}
    </div>
  );
};
export default Slider;
