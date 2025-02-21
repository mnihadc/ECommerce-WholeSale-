const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-blue-300 px-6 py-10">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <div className="flex justify-center mb-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-40 sm:w-52 md:w-64"
            alt="Login Illustration"
          />
        </div>

        <form className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              className="peer w-full p-4 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4 top-3 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
              Email Address
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

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg font-semibold text-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            Login
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
      </div>
    </div>
  );
};

export default Login;
