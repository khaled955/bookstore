
import * as Yup from "yup"
import { useFormik } from "formik"
import { CustomApiError, FormValues } from "../../Interfaces/Interfaces"
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { authSliceActions } from "../../Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { hideRegisterForm, showLoginForm } = authSliceActions
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    "first_name": Yup.string().required("First Name is required").min(4, "First Name Should More Than 3 Character"),
    "last_name": Yup.string().required("last name is required").min(4, "last name should be more than 3 character"),
    password: Yup.string().required("Password is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    email: Yup.string().required("email is required").email("Email must be valid"),
    role: Yup.string().required("role is required").oneOf(["Admin", "Customer"], "Invalid value"),
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      "first_name": "",
      "last_name": "",
      "password": "",
      "email": "",
      "role": ""
    },
    onSubmit: handleRegisterData,
    validationSchema,
  })

  async function handleRegisterData(values: FormValues) {
    const toastId = toast.loading("Waiting")
    try {
      const options = {
        url: `https://upskilling-egypt.com:3007/api/auth/register`,
        method: "POST",
        data: values,
      }
      const { data } = await axios.request(options)
      if (data.status === "SUCCESS") {
        toast.success(data.message)
        formik.resetForm()
        dispatch(hideRegisterForm())
        dispatch(showLoginForm())
      }
    } catch (error) {
      const apiError = error as CustomApiError;
      if (apiError.response && apiError.response.data && apiError.response.data.message) {
        setErrorMessage(apiError.response.data.message);
        toast.error(apiError.response.data.message)
      }
    } finally {
      toast.dismiss(toastId)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="register-container h-screen flex justify-center items-center bg-gray-800/80 fixed top-0 left-0 z-[999] w-screen"
      aria-label="Registration Form"
    >
      <motion.article
        initial={{ scale: 0.8, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-[50%] p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg relative"
      >
        <button
          onClick={() => dispatch(hideRegisterForm())}
          className="absolute top-4 right-4 text-gray-700 dark:text-white hover:text-red-500"
          aria-label="Close register form"
        >
          <i className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
        </button>
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white text-center">
          <i className="fa-solid fa-user mr-2"></i>Register Now
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>

          {/* First Name */}
          <div className="relative">
            <input
              aria-label="First Name"
              id="firstName"
              name="first_name"
              type="text"
              placeholder=" "
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <label
              htmlFor="firstName"
              className="absolute left-3 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600"
            >
              First Name
            </label>
            {formik.errors.first_name && formik.touched.first_name && <p className="text-red-600 text-sm mt-1">*{formik.errors.first_name}</p>}
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              aria-label="Last Name"
              id="lastName"
              name="last_name"
              type="text"
              placeholder=" "
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <label
              htmlFor="lastName"
              className="absolute left-3 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600"
            >
              Last Name
            </label>
            {formik.errors.last_name && formik.touched.last_name && <p className="text-red-600 text-sm mt-1">*{formik.errors.last_name}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              aria-label="Email"
              id="email"
              name="email"
              type="email"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email && <p className="text-red-600 text-sm mt-1">*{formik.errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              aria-label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600"
            >
              Password
            </label>
            <i
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-3 text-gray-500 dark:text-gray-300 cursor-pointer`}
            ></i>
            {formik.errors.password && formik.touched.password && <p className="text-red-600 text-sm mt-1">*{formik.errors.password}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Select Role</label>
            <select
              aria-label="Role"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option disabled value="">Select Your Role</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
            {formik.errors.role && formik.touched.role && <p className="text-red-600 text-sm mt-1">*{formik.errors.role}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer"
          >
            Register
          </button>

          {errorMessage && <p className="text-red-600 text-sm text-center mt-2">{errorMessage}</p>}
        </form>
      </motion.article>
    </motion.section>
  )
}