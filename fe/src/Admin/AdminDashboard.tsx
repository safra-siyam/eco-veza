import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    return (
        <div className="p-8 bg-[#F5F5DC] min-h-screen flex flex-col items-center">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-[#228B22]">Admin Dashboard</h1>
                <p className="text-lg text-[#228B22] mt-2">Manage all aspects of your site with ease</p>
            </header>
            <nav className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl bg-[#F5F5DC]">
                <ul className="list-none space-y-4">
                    <li>
                        <Link 
                            to="/adminseller"
                            className="block text-lg font-semibold text-[#228B22] bg-white p-3 rounded-md hover:bg-[#228B22] hover:text-[#F5F5DC] transition-all"
                        >
                            Manage Sellers
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/add-seller"
                            className="block text-lg font-semibold text-[#228B22] bg-white p-3 rounded-md hover:bg-[#228B22] hover:text-[#F5F5DC] transition-all"
                        >
                            Add Sellers
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/productmanagement"
                            className="block text-lg font-semibold text-[#228B22] bg-white p-3 rounded-md hover:bg-[#228B22] hover:text-[#F5F5DC] transition-all"
                        >
                            Manage Products
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/paymentmanagement"
                            className="block text-lg font-semibold text-[#228B22] bg-white p-3 rounded-md hover:bg-[#228B22] hover:text-[#F5F5DC] transition-all"
                        >
                            Manage Orders
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/usermanagement"
                            className="block text-lg font-semibold text-[#228B22] bg-white p-3 rounded-md hover:bg-[#228B22] hover:text-[#F5F5DC] transition-all"
                        >
                            Manage Buyers
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboard;
