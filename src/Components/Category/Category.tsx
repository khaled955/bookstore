
import { useNavigate } from "react-router-dom";
import CategorySlider from "../CategorySlider/CategorySlider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Interfaces/Interfaces";
import { authSliceActions } from "../../Redux/AuthSlice";
import { motion } from "framer-motion";

export default function HomeCategory() {
  const { token } = useSelector((store: RootState) => store.userReducer);
  const { showLoginForm } = authSliceActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowAllClick = () => {
    if (token) {
      navigate("/allcategorydisplay");
    } else {
      dispatch(showLoginForm());
      localStorage.setItem("currentPath", "/allcategorydisplay");
    }
  };

  return (
    <section
      className="my-6 px-3 overflow-x-hidden"
      aria-labelledby="top-categories-heading"
    >
      <hr className="opacity-25 mb-4" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <motion.h2
          id="top-categories-heading"
          className="text-2xl font-semibold text-gray-800 flex items-center gap-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <i className="fa-solid fa-layer-group text-blue-600"></i>
          Explore Our Top Categories
        </motion.h2>

        <motion.button
          onClick={handleShowAllClick}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
          aria-label="Show all categories"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Show All
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* <CategorySlider /> */}
      </motion.div>
    </section>
  );
}
