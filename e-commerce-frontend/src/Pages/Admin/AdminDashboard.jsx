import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch("http://localhost:5000/api/category");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategory();
  }, []);

  return (
    <div className="text-white">
      <h1 className="mb-10">AdminDashboard</h1>
      <label htmlFor="productName">Product Name: </label>
      <input
        type="text"
        placeholder="Product Name"
        className="text-black"
      />{" "}
      <br /> <br />
      <label htmlFor="description">Description: </label>
      <textarea
        type="text"
        placeholder="Product Description"
        className="text-black"
      />{" "}
      <br /> <br />
      <label htmlFor="price">Price: </label>
      <input
        type="number"
        placeholder="Enter Price"
        className="text-black"
      />{" "}
      <br /> <br />
      <label htmlFor="quantity">Quantity: </label>
      <input
        type="number"
        placeholder="Enter Quantity"
        className="text-black"
      />{" "}
      <br /> <br />
      <label htmlFor="category">Category: </label>
      <select name="category" id="category" className="text-black">
        {categories.map((cat) => {
          return (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          );
        })}
      </select>{" "}
      <br /> <br />
      <label htmlFor="image">Image: </label>
      <input type="file" className="text-black" />
    </div>
  );
};

export default AdminDashboard;
