import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-8" style={{ color: '#228B22' }}>Contact Us</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 py-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-semibold mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#228B22', outlineColor: '#228B22' }}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-semibold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#228B22', outlineColor: '#228B22' }}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-left font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#228B22', outlineColor: '#228B22' }}
              name="message"
              id="message"
              placeholder="Write your message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full font-bold py-2 rounded-lg text-white transition duration-300 hover:bg-green-800"
            style={{ backgroundColor: '#228B22' }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
