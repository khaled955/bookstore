
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomApiError, FormValues } from "../../Interfaces/Interfaces";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { authSliceActions } from "../../Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const { hideForgotPasswordForm, showResetPasswordForm } = authSliceActions;
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
    },
    onSubmit: handleRegisterData,
    validationSchema,
  });

  async function handleRegisterData(values: FormValues) {
    const toastId = toast.loading("Waiting...");
    try {
      const options = {
        url: `https://upskilling-egypt.com:3007/api/auth/forgot-password`,
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === "SUCCESS") {
        toast.success(data.message);
        dispatch(hideForgotPasswordForm());
        dispatch(showResetPasswordForm());
        formik.resetForm();
      }
    } catch (error) {
      const apiError = error as CustomApiError;
      if (
        apiError.response &&
        apiError.response.data &&
        apiError.response.data.message
      ) {
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
      aria-labelledby="forgot-password-title"
      className="fixed inset-0 z-[999] flex justify-center items-center bg-gray-700/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-[500px] bg-white rounded-xl p-6 shadow-lg relative"
      >
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => dispatch(hideForgotPasswordForm())}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
        >
          <i className="fa-solid fa-square-xmark text-2xl cursor-pointer"></i>
        </button>

        {/* Title */}
        <h2
          id="forgot-password-title"
          className="text-xl font-semibold text-gray-700 text-center mb-6"
        >
          <i className="fa-solid fa-user mr-2"></i>Forgot Your Password?
        </h2>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          role="form"
          className="space-y-5"
          aria-label="Forget Password Form"
        >
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm text-gray-600 font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-required="true"
              aria-invalid={formik.errors.email ? "true" : "false"}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 text-sm mt-1">* {formik.errors.email}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
            aria-label="Submit Email"
          >
            Submit
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
