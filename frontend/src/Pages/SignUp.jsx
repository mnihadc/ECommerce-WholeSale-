const SignUp = () => {
  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-r from-green-300 to-blue-300 px-4 py-10">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4 top-3 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
              Your Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder=" "
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4 top-3 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
              Your Email
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder=" "
              pattern="^((\+968)|0)?(9[1-9][0-9]{6})$"
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4 top-3 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
              Mobile Number (Oman)
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder=" "
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4 top-3 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
              Password
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder=" "
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4 top-3 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
              Confirm Password
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 accent-blue-500"
            />
            <label htmlFor="terms" className="ml-3 text-gray-600 text-sm">
              I agree to the{" "}
              <a
                href="#"
                className="text-blue-500 font-semibold hover:underline"
              >
                Terms of Service
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
