import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SellerSignIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BEURL}/api/v1/sellers/signin`, credentials, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Signed in successfully!');
        // Redirect or store authentication state as needed
      }
    } catch (error) {
      toast.error('Error signing in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5DC]">
      <div className="p-8 bg-[#F5F5DC] rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#228B22]">Seller Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-[#228B22]">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#228B22] rounded-md bg-[#F5F5DC] text-[#228B22]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-[#228B22]">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#228B22] rounded-md bg-[#F5F5DC] text-[#228B22]"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-[#228B22] text-[#F5F5DC] font-semibold rounded-md ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e7b1e]'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerSignIn;
