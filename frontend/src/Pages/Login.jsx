import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user); // Get loading state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const { data } = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      dispatch(signInSuccess(data.user)); // Store user details in Redux
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      dispatch(
        signInFailure(
          error.response?.data?.message || "Invalid email or password"
        )
      );
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-300 px-6 py-10">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg font-semibold text-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Dont have an account?{" "}
          <a
            href="/sign-up"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </a>
        </p>

        {/* Toast notifications */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
