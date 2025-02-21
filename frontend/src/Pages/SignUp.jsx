import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", formData);
      toast.success(response.data.message || "Account created successfully!");
      setFormData({
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-r from-green-300 to-blue-300 px-4 py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number (Oman)"
            pattern="^(?:968)?(9|8|7)\d{7}$"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg bg-gray-50"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg font-semibold text-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
