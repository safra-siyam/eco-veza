import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddSeller = () => {
  const [sellerData, setSellerData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellerData({
      ...sellerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/sellers', sellerData, {
        withCredentials: true, // If your backend uses cookies or sessions
      });

      if (response.status === 201) {
        toast.success('Seller added successfully!');
        // Clear form after successful submission
        setSellerData({
          name: '',
          email: '',
          phone: '',
          storeName: '',
          address: '',
        });
      }
    } catch (error) {
      toast.error('Error adding seller. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Seller</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={sellerData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={sellerData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={sellerData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={sellerData.storeName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={sellerData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Add Seller'}
        </button>
      </form>
    </div>
  );
};

export default AddSeller;
