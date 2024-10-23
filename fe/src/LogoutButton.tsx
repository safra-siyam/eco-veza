import React from "react";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext"; // Import the useCart hook

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const { clearCart } = useCart(); // Get clearCart from CartContext

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default link behavior

    // Clear the cart before logging out
    clearCart(); 

    // Proceed with the logout functionality from AuthContext
    await logout();
  };

  return (
    <a
      href="#"
      onClick={handleLogout}
      className="text-[#228B22] hover:text-[#D2B48C] transition py-2 px-4 rounded"
    >
      Logout
    </a>
  );
};

export default LogoutButton;
