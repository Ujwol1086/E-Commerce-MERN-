import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="flex">
        <div className="mr-[3rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4 text-pink-500">
            Register
          </h1>

          <form className="container w-[30rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
                placeholder="Enter name"
              />
            </div>

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
                className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
                placeholder="Enter email"
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
                className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
                placeholder="Enter password"
              />
            </div>

            <div className="my-[2rem]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              Submit
            </button>
          </form>

          <div className="mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt=""
          className="h-[100vh] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </div>
    </section>
  );
};

export default Register;
