import React, { useState } from 'react';

const ContactUs: React.FC = () => {
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
    console.log(formData); // Handle form submission logic
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4 bg-[#F5F5DC]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl px-8 py-10">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-[#228B22]">Get in Touch</h1>
        <p className="text-center mb-8 text-gray-600">
          We'd love to hear from you! Fill out the form below and we'll get back to you soon.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-[#228B22] font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-3 border border-[#228B22] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#228B22] placeholder-gray-400"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#228B22] font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-[#228B22] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#228B22] placeholder-gray-400"
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#228B22] font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 border border-[#228B22] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#228B22] placeholder-gray-400"
              name="message"
              id="message"
              placeholder="Write your message here..."
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white font-bold rounded-md bg-[#228B22] hover:bg-[#196b1b] transition-colors duration-200 shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-[#228B22]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;