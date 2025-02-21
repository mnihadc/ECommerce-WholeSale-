import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, ClipboardList, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { signoutUserSuccess } from "../Redux/user/userSlice";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(signoutUserSuccess());
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg z-50">
      {/* Desktop & Mobile Header */}
      <div className="flex justify-between items-center p-4 container mx-auto">
        <div className="flex items-center gap-2">
          <img
            src="https://thumbs.dreamstime.com/b/web-179112724.jpg"
            alt="logo"
            className="h-8"
          />
          <span className="text-xl font-bold">MNC</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {/* Pages Dropdown */}
          <div className="relative">
            <button
              className="font-medium flex items-center gap-1 hover:text-gray-300 transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Pages <ChevronDown className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-40 bg-white text-gray-900 shadow-lg rounded-lg"
              >
                <a href="/home" className="block px-4 py-2 hover:bg-gray-100">
                  Home
                </a>
                <a href="#about" className="block px-4 py-2 hover:bg-gray-100">
                  About
                </a>
              </motion.div>
            )}
          </div>

          {/* Icons & Profile/Login */}
          <div className="flex items-center gap-4">
            <ClipboardList className="w-6 h-6 cursor-pointer hover:text-gray-300 transition duration-300" />
            <span className="text-lg font-semibold">$120.00</span>
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-300 transition duration-300" />

            {/* Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                  <img
                    src={
                      currentUser.avatar ||
                      "https://bootdey.com/img/Content/avatar/avatar7.png"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                  />
                </button>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white text-gray-900 shadow-lg rounded-lg"
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
