
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomApiError, FormValues, RootState } from "../../Interfaces/Interfaces";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function ChangePassword({ handleHideForm }: { handleHideForm: () => void }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useSelector((store: RootState) => store.userReducer);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, with uppercase, lowercase, number, and special character"
      ),
    password_new: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Minimum eight characters, with uppercase, lowercase, number, and special character"
      ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      password_new: "",
    },
    onSubmit: handleRegisterData,
    validationSchema,
  });

  async function handleRegisterData(values: FormValues) {
    const toastId = toast.loading("Waiting...");
    try {
      const options = {
        url: `https://upskilling-egypt.com:3007/api/auth/change-password`,
        method: "POST",
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "SUCCESS") {
        toast.success(data.message);
        setTimeout(() => handleHideForm(), 2000);
      }
    } catch (error) {
      const apiError = error as CustomApiError;
      if (apiError.response?.data?.message) {
        setErrorMessage(apiError.response.data.message);
        toast.error(apiError.response.data.message);
      }
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <section
      role="dialog"
      aria-labelledby="change-password-title"
      className="fixed inset-0 z-[999] bg-gray-800/60 backdrop-blur-sm flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-[500px] bg-white rounded-xl p-6 shadow-lg relative"
      >
        <button
          aria-label="Close"
          onClick={handleHideForm}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
        >
          <i className="fa-solid fa-square-xmark text-2xl cursor-pointer"></i>
        </button>

        <h2
          id="change-password-title"
          className="text-xl font-semibold text-gray-700 text-center mb-6"
        >
          <i className="fa-solid fa-user mr-2"></i>Change Your Password
        </h2>

        <form onSubmit={formik.handleSubmit} role="form" className="space-y-5">
          {/* Old Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 font-medium"
            >
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your current password"
              aria-required="true"
              aria-invalid={formik.errors.password ? "true" : "false"}
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
              className={`fa-solid ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } absolute right-3 top-9 cursor-pointer text-gray-500`}
            ></i>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-sm mt-1">* {formik.errors.password}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label
              htmlFor="password_new"
              className="block text-sm text-gray-600 font-medium"
            >
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password_new"
              name="password_new"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password_new}
              className="mt-1 w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a new password"
              aria-required="true"
              aria-invalid={formik.errors.password_new ? "true" : "false"}
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
              className={`fa-solid ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } absolute right-3 top-9 cursor-pointer text-gray-500`}
            ></i>
            {formik.errors.password_new && formik.touched.password_new && (
              <p className="text-red-600 text-sm mt-1">* {formik.errors.password_new}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
            aria-label="Change Password"
          >
            Change Now
          </button>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-center mt-2">{errorMessage}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

