import React from "react";
import { Link } from "react-router-dom";

// Social media icons as SVG components for scalability and customization
const FacebookIcon = () => (
  <svg
    className="w-6 h-6 fill-current text-beige hover:text-white transition-colors duration-300"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22,12A10,10 0 1,0 12,22A10,10 0 0,0 22,12Z M15.5,12.5H13V18H10V12.5H8V10H10V8A2,2 0 0,1 12,6H15V10H14C13.4477,10 13,10.4477 13,11V12.5H15L14.5,15H13V18H15.5L15,15H17V12.5H15Z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    className="w-6 h-6 fill-current text-beige hover:text-white transition-colors duration-300"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.3 21.88,4.27C21.04,4.77 20.11,5.11 19.13,5.31C18.35,4.5 17.22,4 16,4C13.65,4 11.81,5.84 11.81,8.19C11.81,8.54 11.84,8.88 11.9,9.21C8.28,9.05 4.91,7.38 2.9,4.79C2.51,5.42 2.3,6.15 2.3,6.93C2.3,8.37 3.07,9.63 4.24,10.31C3.44,10.3 2.7,10.1 2.05,9.76V9.81C2.05,12.05 3.61,13.89 5.75,14.29C5.35,14.4 4.93,14.45 4.5,14.45C4.21,14.45 3.93,14.42 3.66,14.36C4.23,16.14 5.78,17.38 7.6,17.42C6.06,18.58 4.11,19.24 2,19.24C1.63,19.24 1.27,19.22 0.91,19.16C2.75,20.35 5.1,21 7.5,21C16,21 20.7,14.5 20.7,8.54C20.7,8.34 20.7,8.15 20.69,7.95C21.5,7.37 22.2,6.59 22.46,6Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-6 h-6 fill-current text-beige hover:text-white transition-colors duration-300"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12,2.2C6.5,2.2 2.2,6.5 2.2,12C2.2,17.5 6.5,21.8 12,21.8C17.5,21.8 21.8,17.5 21.8,12C21.8,6.5 17.5,2.2 12,2.2ZM12,19.8C7.6,19.8 4.2,16.4 4.2,12C4.2,7.6 7.6,4.2 12,4.2C16.4,4.2 19.8,7.6 19.8,12C19.8,16.4 16.4,19.8 12,19.8ZM17.5,7.5C17.5,8.3 16.8,9 16,9C15.2,9 14.5,8.3 14.5,7.5C14.5,6.7 15.2,6 16,6C16.8,6 17.5,6.7 17.5,7.5ZM12,7.8C9.4,7.8 7.2,10 7.2,12.6C7.2,15.2 9.4,17.4 12,17.4C14.6,17.4 16.8,15.2 16.8,12.6C16.8,10 14.6,7.8 12,7.8ZM12,15.3C10.2,15.3 8.8,13.9 8.8,12.1C8.8,10.3 10.2,8.9 12,8.9C13.8,8.9 15.2,10.3 15.2,12.1C15.2,13.9 13.8,15.3 12,15.3Z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#228B22] text-beige">
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* About Us */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">About Organic Ecoveza</h3>
            <p className="text-sm">
              At Organic Ecoveza, we are committed to providing the highest quality organic products
              that nurture both you and the environment. Our mission is to promote sustainable living
              through eco-friendly solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-1">
                <Link to="/" className="hover:text-[#F5F5DC] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/products" className="hover:text-[#F5F5DC] transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="hover:text-[#F5F5DC] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="hover:text-[#F5F5DC] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              123 Eco Street<br />
              Green City, GC 45678<br />
              Email: <a href="mailto:info@ecoveza.com" className="hover:text-[#F5F5DC] transition-colors duration-300">info@ecoveza.com</a><br />
              Phone: <a href="tel:+1234567890" className="hover:text-[#F5F5DC] transition-colors duration-300">+1 (234) 567-890</a>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-beige pt-4 text-center text-xs">
          &copy; {new Date().getFullYear()} Organic Ecoveza. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
