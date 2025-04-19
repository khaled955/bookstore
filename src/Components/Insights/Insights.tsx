import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faUsers,
  faTruck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"
export default function Insights() {

    const insights = [
        { icon: faBookOpen, title: "Books Available", value: "50,000+" },
        { icon: faUsers, title: "Happy Customers", value: "120K+" },
        { icon: faTruck, title: "Fast Deliveries", value: "24-48 Hours" },
        { icon: faStar, title: "Customer Rating", value: "4.9/5 ⭐" },
      ];




  return (
    <div>
        <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📊 Bookstore Insights
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            <FontAwesomeIcon
              icon={insight.icon}
              className="text-blue-500 text-4xl mb-3"
            />
            <motion.p
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {insight.value}
            </motion.p>
            <p className="text-gray-600 text-sm mt-3">{insight.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  )
}
