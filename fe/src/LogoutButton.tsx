// LogoutButton.tsx

import React from "react";
import { useAuth } from "./context/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default link behavior
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
