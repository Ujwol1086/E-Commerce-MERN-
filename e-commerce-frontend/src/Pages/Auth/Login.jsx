import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUserInfo } = useOutletContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.log("Response status:", response.status); // Debug response status
        throw new Error("Invalid Email or Password");
      }
      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data); // Set user info for state management
      navigate("/"); // Redirect to the homepage
      toast.success("Login Successful");
    } catch (error) {
      toast.error("Login Error:", error.message);
    }
  };

  return (
    <div className="flex gap-10">
      <section className="pl-[10rem]">
        <div className="mr-[5rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4 text-pink-500">Sign In</h1>
        </div>

        <form onSubmit={handleLogin} className="container w-[30rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1.5 p-2 border rounded w-full bg-gray-600 text-white"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1.5 p-2 border rounded w-full bg-gray-600 text-white"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded cursor-pointer my-[1rem]"
          >
            Submit
          </button>
        </form>

        <div className="mt-4">
          <p className="text-white">
            New Customer ? {""}
            <Link to="/register" className="text-pink-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </section>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[100vh] w-[53%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </div>
  );
};

export default Login;
