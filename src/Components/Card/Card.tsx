
import { useNavigate } from "react-router-dom";
import { Book, bookProp, RootState } from "../../Interfaces/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../Redux/AuthSlice";
import { useState } from "react";
import { addItemToCart } from "../../Redux/CartSlice";
import { AppDispatch } from "../../Redux/Store";
import { addBookToWhishlist } from "../../Redux/whishlistSlice";

export default function Card({ productInfo, books, index }: bookProp) {
  const [counter, setCounter] = useState(1);
  const { token } = useSelector((store: RootState) => store.userReducer);
  const { whislistBooks } = useSelector((store: RootState) => store.whishListReducer);

  const { showLoginForm } = authSliceActions;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isInWishlist = whislistBooks.some((book: Book) => book._id === productInfo._id);

  return (
    <article
      className="card-box shadow-md rounded-xl overflow-hidden bg-white p-4 flex flex-col transition-shadow hover:shadow-lg"
      role="article"
      aria-label={`Book card for ${books?.nameofbook}`}
    >
      <button
        onClick={() => {
          if (!token) {
            dispatch(showLoginForm());
            localStorage.setItem("currentPath", `/details/${productInfo._id}/${index}`);
          } else {
            navigate(`/details/${productInfo._id}/${index}`);
          }
        }}
        className="img-box p-4 cursor-pointer"
        aria-label={`View details of ${books?.nameofbook}`}
      >
        <img
          className="w-full h-60 object-contain rounded-lg"
          src={books?.photo}
          alt={`Cover of ${books?.nameofbook}`}
        />
      </button>

      <header className="text-center my-2">
        <h2 className="text-lg font-bold text-blue-900">{books?.nameofbook}</h2>
      </header>

      <section className="product-info">
        <p className="text-sm text-gray-700 text-center line-clamp-3">{books?.details}</p>

        <div className="flex justify-between items-center my-3">
          <span className="text-sm font-medium text-black">
            {productInfo.price} <span className="text-gray-500">EG</span>
          </span>
          <div className="text-yellow-600 flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <i key={i} className="fa-solid fa-star" aria-hidden="true"></i>
            ))}
            <span className="ml-1 text-sm text-gray-700">4.8</span>
          </div>
        </div>

        <div className="btn-count flex justify-center items-center gap-6 my-4">
          <button
            onClick={() => setCounter(counter - 1)}
            disabled={counter === 1}
            className="text-red-600 hover:text-red-800 disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <i className="fa-solid fa-minus cursor-pointer"></i>
          </button>
          <span className="bg-red-600 text-white w-6 h-6 grid place-content-center rounded-full text-sm">
            {counter}
          </span>
          <button
            onClick={() => setCounter(counter + 1)}
            disabled={counter === 10}
            className="text-green-600 hover:text-green-800 disabled:opacity-50"
            aria-label="Increase quantity"
          >
            <i className="fa-solid fa-plus cursor-pointer"></i>
          </button>
        </div>
      </section>

      <footer className="flex justify-between border-t pt-3 mt-3 border-gray-300">
        <button
          className={`p-3 rounded-full border border-gray-300 hover:shadow transition duration-300 size-10 flex justify-center items-center ${
            isInWishlist ? "bg-red-600 text-white" : "bg-white"
          }`}
          onClick={() => {
            if (token) {
              dispatch(addBookToWhishlist(productInfo));
            } else {
              dispatch(showLoginForm());
            }
          }}
          aria-label="Add to wishlist"
          title="Add to Wishlist"
        >
          <i className={`fa-heart ${isInWishlist ? "fa-solid" : "fa-regular"} cursor-pointer`}></i>
        </button>

        <button
          onClick={() => {
            if (token) {
              navigate(`/details/${productInfo._id}/${index}`);
            } else {
              dispatch(showLoginForm());
            }
          }}
          className="p-3 rounded-full border border-gray-300 hover:shadow transition duration-300 size-10 flex justify-center items-center"
          aria-label="View details"
          title="Show Details"
        >
          <i className="fa-solid fa-eye cursor-pointer"></i>
        </button>

        <button
          onClick={() => {
            if (token) {
              dispatch(addItemToCart({ bookId: productInfo._id, bookQuantity: counter }));
            } else {
              dispatch(showLoginForm());
            }
          }}
          className="p-3 rounded-full border border-gray-300 hover:shadow-md transition duration-300 size-10 flex justify-center items-center"
          aria-label="Add to cart"
          title="Add to Cart"
        >
          <i className="fa-solid fa-cart-plus text-green-700 cursor-pointer"></i>
        </button>
      </footer>
    </article>
  );
}
