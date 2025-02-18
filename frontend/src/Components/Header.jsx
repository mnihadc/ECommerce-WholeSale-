import { useState } from "react";
import { ShoppingCart, User, ClipboardList, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <span className="text-xl font-bold ">MNC</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 ">
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
                <a href="#about" className="block px-4 py-2 hover:bg-gray-100">
                  About
                </a>
              </motion.div>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 cursor-pointer hover:text-gray-300 transition duration-300" />
            <ClipboardList className="w-6 h-6 cursor-pointer hover:text-gray-300 transition duration-300" />
            <span className="text-lg font-semibold">$120.00</span>
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-300 transition duration-300" />
          </div>
        </nav>
      </div>
    </header>
  );
}
