import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import {
  MdAdminPanelSettings,
  MdLogout,
  MdArrowDropDown,
} from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ userInfo }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = async () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingDetails");
    window.location.href = "/login";
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>
          {""}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Shop</span>
          {""}
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Cart</span>
          {""}
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaRegHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
          {""}
        </Link>
      </div>

      <div>
        {userInfo ? (
          <div className="flex flex-col">
            <div className="relative flex">
              {userInfo.role === "admin" ? (
                <p className="flex items-center">
                  <MdAdminPanelSettings className="mr-2 mt-[3rem]" size={26} />
                  <span className="hidden nav-item-name mt-[3rem] text-white">
                    {userInfo.username} (Admin)
                  </span>
                </p>
              ) : (
                <p className="flex items-center">
                  <AiOutlineUser className="mr-2 mt-[3rem]" size={26} />
                  <span className="hidden nav-item-name mt-[3rem] text-white">
                    {userInfo.username}
                  </span>
                </p>
              )}
              <div>
                <MdArrowDropDown
                  onClick={toggleDropdown}
                  className="hidden nav-item-name mt-[3rem] cursor-pointer"
                  size={30}
                />
              </div>
              {showDropdown && (
                <div className=" absolute hidden nav-item-name bottom-10 left-10 bg-gray-700 text-white p-2 rounded shadow-lg">
                  {userInfo.role === "admin" ? (
                    <>
                      <Link
                        to="/admindashboard"
                        className="block py-1 px-2 hover:bg-gray-600"
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/addproduct"
                        className="block py-1 px-2 hover:bg-gray-600"
                      >
                        Add Product
                      </Link>
                      <Link
                        to="/allorders"
                        className="block py-1 px-2 hover:bg-gray-600"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/allproducts"
                        className="block py-1 px-2 hover:bg-gray-600"
                      >
                        Manage Product
                      </Link>
                      <Link
                        to="/allusers"
                        className="block py-1 px-2 hover:bg-gray-600"
                      >
                        Manage Users
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="block py-1 px-2 hover:bg-gray-600"
                      >
                        Update Profile
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={handleLogOut} className="flex items-center">
              <MdLogout className="mr-2 mt-[2rem]" />
              <span className="hidden nav-item-name mt-[2rem]">Log Out</span>
            </button>
          </div>
        ) : (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
                {""}
              </Link>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
                {""}
              </Link>
              <Link
                to="/admin/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <MdAdminPanelSettings className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">
                  Admin Login
                </span>
                {""}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
