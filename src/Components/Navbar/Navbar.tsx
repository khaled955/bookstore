
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { useEffect, useState } from "react";
import { userSliceActions } from "../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { bookCartInfo, RootState } from "../../Interfaces/Interfaces";
import { authSliceActions } from "../../Redux/AuthSlice";
import { getCartData } from "../../Redux/CartSlice";
import { AppDispatch } from "../../Redux/Store";
import { resetBookListWishes } from "../../Redux/whishlistSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const { logOut } = userSliceActions;
  const { hideLoginForm, showLoginForm } = authSliceActions;
  const dispatch = useDispatch<AppDispatch>();
  const { cartData } = useSelector((store: RootState) => store.cartReducer);
  const { token } = useSelector((store: RootState) => store.userReducer);
  const { whislistBooks } = useSelector((store: RootState) => store.whishListReducer);

  useEffect(() => {
    if(token) dispatch(getCartData());
  }, []);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium rounded-md px-3 py-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 ${
      isActive ? "bg-blue-700 text-white" : "hover:bg-blue-100"
    }`;

  return (
    <header role="banner">
      <nav
        className="p-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md bg-white z-50"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Bookstore Home">
          <img src={logo} alt="Bookstore Logo" className="w-16 rounded-md object-contain" />
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-2xl"
          aria-expanded={!showMenu}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${showMenu ? "fa-bars" : "fa-xmark"} cursor-pointer`}></i>
        </button>

        {/* Navigation Content */}
        <div
          id="primary-navigation"
          className={`flex items-center flex-1 transition-all duration-300 ${
            showMenu ? "hidden" : "absolute"
          } md:flex top-full md:static bg-white w-full md:w-auto left-0 flex-col md:flex-row gap-5`}
        >
          {/* Nav Items */}
          <ul className="flex items-center gap-4 flex-1 justify-center flex-col md:flex-row mb-4 md:mb-0">
            <li>
              <NavLink onClick={()=>{setShowMenu(true)}} to="/" className={navItemClass} aria-label="Home" aria-current="page">
                Home
              </NavLink>
            </li>
            <li>
            <button
  onClick={() => {
    setShowMenu(true);
    if (token) {
      navigate("/allbooks");
    } else {
      dispatch(showLoginForm());
      localStorage.setItem("currentPath", "/allbooks");
    }
  }}
  className={`font-medium rounded-md px-3 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
    location.pathname === "/allbooks" ? "bg-blue-700 text-white" : ""
  }`}
  aria-label="All Books"
>
  All Books
</button>
            </li>
            <li>
            <button
  onClick={() => {
    setShowMenu(true);
    if (token) {
      navigate("/allcategorydisplay");
    } else {
      dispatch(showLoginForm());
      localStorage.setItem("currentPath", "/allcategorydisplay");
    }
  }}
  className={`font-medium rounded-md px-3 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
    location.pathname === "/allcategorydisplay" ? "bg-blue-700 text-white" : ""
  }`}
  aria-label="Categories"
>
  Categories
</button>

            </li>
            <li>
            <button
  onClick={() => {
    setShowMenu(true);
    if (token) {
      navigate("/orders");
    } else {
      dispatch(showLoginForm());
      localStorage.setItem("currentPath", "/orders");
    }
  }}
  className={`font-medium rounded-md px-3 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
    location.pathname === "/orders" ? "bg-blue-700 text-white" : ""
  }`}
  aria-label="orders"
>
  Orders
</button>

            </li>
          </ul>

          {/* User Actions */}
          {token && (
            <div className="flex items-center gap-4">
              <Link to="/profile" onClick={() => setShowMenu(true)} aria-label="Profile">
                <i className="fa-solid fa-user text-2xl hover:text-blue-700 transition-colors duration-200"></i>
              </Link>

              <div className="relative">
                <Link to="/cart" onClick={() => setShowMenu(true)} aria-label="Cart">
                  <i className="fa-solid fa-cart-shopping text-2xl text-yellow-600 hover:text-yellow-800 transition"></i>
                </Link>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-700 text-white text-xs rounded-full flex items-center justify-center">
                  {cartData ? cartData.items.filter((item: bookCartInfo) => item.quantity > 0).length : 0}
                </div>
              </div>

              <div className="relative">
                <Link to="/wishlist" onClick={() => setShowMenu(true)} aria-label="Wishlist">
                  <i className="fa-solid fa-heart text-2xl hover:text-red-600 transition"></i>
                </Link>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {whislistBooks.length || 0}
                </div>
              </div>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="pr-3">
            {!token ? (
              <button
                onClick={() => {
                  setShowMenu(true);
                  dispatch(showLoginForm());
                }}
                className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-800 transition cursor-pointer"
                aria-label="Login"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowMenu(true);
                  dispatch(logOut());
                  localStorage.clear();
                  dispatch(resetBookListWishes());
                  dispatch(hideLoginForm());
                  navigate("/");
                }}
                title="Logout"
                aria-label="Logout"
              >
                <i className="fa-solid fa-right-from-bracket text-xl text-red-600 hover:text-red-800 transition cursor-pointer"></i>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
