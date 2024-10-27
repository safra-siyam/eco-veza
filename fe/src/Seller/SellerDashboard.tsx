import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [salesThisMonth, setSalesThisMonth] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/orders/myOrders', {
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error("Failed Fetching . . .");
        }

        const data = response.data;

        setOrders(data);

        // Calculate metrics
        calculateDashboardMetrics(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const calculateDashboardMetrics = (orders: any) => {
    // Unique product count
    const uniqueProducts = new Set(orders.map((order: any) => order.productName));
    setTotalProducts(uniqueProducts.size);

    // Pending orders count
    const pendingOrdersCount = orders.filter((order: any) => order.status != 'DELIVERED').length;
    setPendingOrders(pendingOrdersCount);

    // Sales this month
    const currentMonth = new Date().getMonth();
    const salesThisMonthTotal = orders.reduce((acc: any, order: any) => {
      const orderMonth = new Date(order.OrderDate).getMonth();
      if (orderMonth == currentMonth) {
        return acc + order.price * order.addToCartQuantity;
      }
      return acc;
    }, 0);
    setSalesThisMonth(salesThisMonthTotal);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
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
            {/* <Link to="orders" className="block py-2 px-4 rounded hover:bg-[#1e7b1e]">
              Orders
            </Link> */}
          </nav>
        </aside>

        <main className="w-3/4 p-8">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#228B22]">Hi Seller</h1>
          </header>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[#F5F5DC] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#228B22] mb-2">Total Products</h3>
              <p className="text-2xl font-bold text-[#228B22]">{totalProducts}</p>
            </div>
            <div className="p-6 bg-[#F5F5DC] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#228B22] mb-2">Pending Orders</h3>
              <p className="text-2xl font-bold text-[#228B22]">{pendingOrders}</p>
            </div>
            <div className="p-6 bg-[#F5F5DC] rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#228B22] mb-2">Sales This Month</h3>
              <p className="text-2xl font-bold text-[#228B22]">${salesThisMonth.toFixed(2)}</p>
            </div>
          </section>

          {/* Recent Orders Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#228B22] mb-4">Recent Orders</h2>
            <div className="bg-[#F5F5DC] rounded-lg shadow-lg p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4">Product</th>
                    <th className="text-left py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Customer</th>
                    <th className="text-left py-2 px-4">Qty.</th>
                    <th className="text-left py-2 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.OrderDate}>
                      <td className="py-2 px-4">{order.productName}</td>
                      <td className="py-2 px-4">${order.price}</td>
                      <td className="py-2 px-4">{order.status}</td>
                      <td className="py-2 px-4">{order.BuyerId}</td>
                      <td className="py-2 px-4">{order.addToCartQuantity}</td>
                      <td className="py-2 px-4">{order.OrderDate}</td>

                    </tr>
                  ))}
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
