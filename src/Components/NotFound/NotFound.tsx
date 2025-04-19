
import { Link } from "react-router-dom";
import notFound from "../../assets/images/notfound.png";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen px-4 text-center bg-gray-100 dark:bg-gray-900">
      <motion.img
        src={notFound}
        alt="404 Not Found"
        className="w-full max-w-md mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
        Oops! Page not found.
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        aria-label="Go back to homepage"
      >
        Go Home
      </Link>
    </div>
  );
}

