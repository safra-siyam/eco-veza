import React from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-1/4 bg-[#228B22] text-[#FAF9F6] min-h-screen p-4">
          <h2 className="text-3xl font-bold text-center mb-6">Seller Dashboard</h2>
          <nav className="space-y-4">
            <Link to="/sellerdashboard" className="block py-2 px-4 rounded hover:bg-[#1e7b1e]">
              Overview
            </Link>
            <Link to="/sellerproducts" className="block py-2 px-4 rounded hover:bg-[#1e7b1e]">
              My Products
            </Link>
            <Link to="/dashboard/add-product" className="block py-2 px-4 rounded hover:bg-[#1e7b1e]">
              Add Product
            </Link>
            <Link to="/dashboard/orders" className="block py-2 px-4 rounded hover:bg-[#1e7b1e]">
              Orders
            </Link>
            <Link to="/dashboard/settings" className="block py-2 px-4 rounded hover:bg-[#1e7b1e]">
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-8">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#228B22]">Hi...</h1>
            <button className="bg-[#228B22] text-[#FAF9F6] py-2 px-4 rounded-md hover:bg-[#1e7b1e]">
              Sign Out
            </button>
          </header>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[#F5F5DC] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#228B22] mb-2">Total Products</h3>
              <p className="text-2xl font-bold text-[#228B22]">15</p>
            </div>
            <div className="p-6 bg-[#F5F5DC] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#228B22] mb-2">Pending Orders</h3>
              <p className="text-2xl font-bold text-[#228B22]">7</p>
            </div>
            <div className="p-6 bg-[#F5F5DC] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#228B22] mb-2">Sales This Month</h3>
              <p className="text-2xl font-bold text-[#228B22]">$1,200</p>
            </div>
          </section>

          {/* Recent Orders Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#228B22] mb-4">Recent Orders</h2>
            <div className="bg-[#F5F5DC] rounded-lg shadow-lg p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4">Order ID</th>
                    <th className="text-left py-2 px-4">Customer</th>
                    <th className="text-left py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">#12345</td>
                    <td className="py-2 px-4">John Doe</td>
                    <td className="py-2 px-4">$100</td>
                    <td className="py-2 px-4">Pending</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">#12346</td>
                    <td className="py-2 px-4">Jane Smith</td>
                    <td className="py-2 px-4">$250</td>
                    <td className="py-2 px-4">Completed</td>
                  </tr>
                  {/* Add more orders as needed */}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
