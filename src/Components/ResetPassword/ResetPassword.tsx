
import * as Yup from "yup"
import { useFormik } from "formik"
import { CustomApiError, FormValues } from "../../Interfaces/Interfaces"
import toast from "react-hot-toast"
import { useState } from "react"
import axios from "axios"
import { authSliceActions } from "../../Redux/AuthSlice"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"

export default function ResetPassword() {
  const { hideResetPasswordForm, showLoginForm } = authSliceActions
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, at least one upper case, one lower case, one number and one special character"
      ),
    email: Yup.string().required("Email is required").email("Email must be valid"),
    otp: Yup.string().required("OTP is required"),
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      email: "",
      otp: "",
    },
    onSubmit: handleRegisterData,
    validationSchema,
  })

  async function handleRegisterData(values: FormValues) {
    const toastId = toast.loading("Waiting...")
    try {
      const { data } = await axios.post(
        "https://upskilling-egypt.com:3007/api/auth/reset-password",
        values
      )
      if (data.status === "SUCCESS") {
        toast.success(data.message)
        formik.resetForm()
        dispatch(hideResetPasswordForm())
        setTimeout(() => {
          dispatch(showLoginForm())
        }, 2000)
      }
    } catch (error) {
      const apiError = error as CustomApiError
      if (apiError.response?.data?.message) {
        setErrorMessage(apiError.response.data.message)
        toast.error(apiError.response.data.message)
      }
    } finally {
      toast.dismiss(toastId)
    }
  }

  return (
    <section
      aria-label="Reset Password Form"
      className="fixed top-0 left-0 z-[999] w-full h-screen bg-black/70 flex items-center justify-center px-4"
    >
      <motion.div
        className="bg-white text-black p-6 md:p-10 rounded-xl shadow-lg w-full max-w-xl relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          aria-label="Close form"
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-red-500"
          onClick={() => dispatch(hideResetPasswordForm())}
        >
          <i className="fa-solid fa-circle-xmark cursor-pointer"></i>
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          <i className="fa-solid fa-key mr-2"></i>Reset Password
        </h2>

        <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              aria-label="Email address"
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              aria-label="New password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <i
              role="button"
              aria-label="Toggle password visibility"
              className={`fa-solid ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } absolute top-10 right-3 text-gray-500 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              aria-label="One time password"
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.otp}
            />
            {formik.errors.otp && formik.touched.otp && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.otp}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md font-semibold cursor-pointer"
          >
            Submit
          </button>
          {errorMessage && (
            <p className="text-center text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
        </form>
      </motion.div>
    </section>
  )
}
