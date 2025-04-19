
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomApiError, FormValues } from "../../Interfaces/Interfaces";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../Redux/AuthSlice";
import { userSliceActions } from "../../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing framer-motion

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { setToken } = userSliceActions;
  const { hideLoginForm, showForgotPasswordForm, showRegisterForm } =
    authSliceActions;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    email: Yup.string().required("Email is required").email("Email must be valid"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: handleLoginData,
    validationSchema,
  });

  async function handleLoginData(values: FormValues) {
    const toastId = toast.loading("Waiting...");
    try {
      const options = {
        url: `https://upskilling-egypt.com:3007/api/auth/login`,
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === "SUCCESS") {
        toast.success(data.message);
        dispatch(setToken(data.data.accessToken));
        localStorage.setItem("userToken", data.data.accessToken);
        dispatch(hideLoginForm());
        const redirectPath = localStorage.getItem("currentPath") || "/";
        setTimeout(() => {
          navigate(redirectPath);
          localStorage.removeItem("currentPath");
        }, 1000);
      }
    } catch (error) {
      const apiError = error as CustomApiError;
      if (apiError.response && apiError.response.data && apiError.response.data.message) {
        setErrorMessage(apiError.response.data.message);
        toast.error(apiError.response.data.message);
      }
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
      <motion.div
        className="register-container h-screen flex justify-center items-center bg-gray-700/30 fixed top-0 left-0 z-[999] w-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full md:w-[50%] p-6 bg-gradient-to-tl from-blue-800 via-purple-800 to-indigo-600 rounded-xl shadow-xl relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <div className="close-btn absolute -top-0 right-4 md:right-0">
            <i
              onClick={() => {
                dispatch(hideLoginForm());
              }}
              className="fa-solid fa-square-xmark text-white text-2xl cursor-pointer"
            ></i>
          </div>

          <motion.h2
            className="mb-6 text-3xl font-extrabold text-white text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fa-solid fa-user mr-2"></i>Login Now
          </motion.h2>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                id="email"
                name="email"
                type="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                aria-label="Email address"
                className="peer w-full px-5 py-3 text-white bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-5 top-3 text-gray-400 text-sm transition-all duration-200 peer-focus:text-blue-400 peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs"
              >
                Email
              </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-white text-sm mt-1">{formik.errors.email}</p>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                aria-label="Password"
                required
                className="peer w-full px-5 py-3 text-white bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 rounded-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-3 text-gray-400 text-sm transition-all duration-200 peer-focus:text-blue-400 peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs"
              >
                Password
              </label>
              <i
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } absolute right-5 top-4 text-white text-lg cursor-pointer hover:text-blue-400 transition-all`}
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              ></i>
              {formik.touched.password && formik.errors.password && (
                <p className="text-white text-sm mt-1">{formik.errors.password}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              className="btn bg-blue-600 text-white py-3 w-full rounded-lg text-lg font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            {errorMessage && (
              <motion.p
                className="text-white text-sm capitalize text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errorMessage}
              </motion.p>
            )}
          </form>

          <div className="flex justify-between items-center mt-4">
            <p className="text-white text-sm">
              *Don't Have an account?{" "}
              <span
                onClick={() => {
                  dispatch(hideLoginForm());
                  dispatch(showRegisterForm());
                }}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                Register Now
              </span>
            </p>
            <p
              onClick={() => {
                dispatch(hideLoginForm());
                dispatch(showForgotPasswordForm());
              }}
              className="text-white text-sm cursor-pointer hover:text-blue-400"
            >
              Forgot password?
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
