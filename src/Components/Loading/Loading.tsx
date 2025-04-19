
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-black/80 fixed top-0 left-0 w-full h-screen z-[9999] overflow-hidden flex flex-col items-center justify-center gap-6 p-4"
    >
      <motion.span
        className="loader"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <motion.span
        className="loader-two text-teal-400 text-3xl font-bold tracking-wide"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Loading...
      </motion.span>
    </div>
  );
}
