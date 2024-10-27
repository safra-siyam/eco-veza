import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LogoutButton from './LogoutButton';
import logo from '../src/assets/logo.png';
import Cookies from "js-cookie";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-[#F5F5DC] shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Right Side: Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
            Home
          </Link>
          <Link to="/about" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
            About Us
          </Link>
          {isAuthenticated && Cookies.get("userType") == "Buyer" && (
            <>
              <Link to="/products" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Products
              </Link>
            </>
          )}
          <Link to="/contact" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
            Contact Us
          </Link>
          {isAuthenticated && Cookies.get("userType") == "Admin" &&  (
            <>
              <Link to="/admindashboard" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Dashboard
              </Link>
            </>
          )}
          {isAuthenticated && Cookies.get("userType") == "Seller" &&  (
            <>
              <Link to="/sellerdashboard" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Dashboard
              </Link>
            </>
          )}
          {isAuthenticated && Cookies.get("userType") == "Buyer" &&  (
            <>
              <Link to="/cart" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Cart
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/signin" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Sign In
              </Link>
              <Link to="/signup" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated && <LogoutButton />}

          {/* Get Started Button in Navbar
          <Link
            to="/signinseller"
            className="bg-[#228B22] text-white py-2 px-4 rounded hover:bg-[#145214] transition duration-300"
          >
            Seller
          </Link> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-[#228B22] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col space-y-2 p-4 bg-[#F5F5DC] shadow-md">
            <li>
              <Link to="/" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                Cart
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/signin" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-[#228B22] hover:text-[#D2B48C] transition duration-300 py-2 px-4 rounded">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <LogoutButton />
              </li>
            )}
            {/* Get Started Button for Mobile */}
            <li>
              <Link
                to="/get-started"
                className="bg-[#228B22] text-white py-2 px-4 rounded hover:bg-[#145214] transition duration-300"
              >
                Seller
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
