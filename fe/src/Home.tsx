// src/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5DC] p-6">
      <div className="container mx-auto text-center">
        {/* Header Text */}
        <h1 className="text-6xl font-bold text-[#228B22] mb-4">
          Save the planet Earth!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover eco-friendly and sustainable products. Join the movement and
          make an impact!
        </p>

        {/* CTA Button */}
        <Link
          to="/products"
          className="inline-block bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Shop All
        </Link>

        {/* Image Section */}
        <div className="mt-10">
          <img
            src="../src/assets/twig.jpeg"
            alt="Nature Image"
            className="w-full max-w-4xl mx-auto shadow-lg rounded-lg"
          />
        </div>

        {/* Latest Arrivals Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-semibold text-[#228B22] mb-8">
            Our Latest Arrivals
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Check out our newest eco-friendly products. You can find something
            special to contribute to a greener planet!
          </p>

          {/* Latest Arrivals Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="../src/assets/latest1.jpeg"
                alt="Latest Arrival 1"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="../src/assets/latest2.jpeg"
                alt="Latest Arrival 2"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="../src/assets/latest3.jpeg"
                alt="Latest Arrival 3"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* CTA Button for Latest Arrivals */}
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Shop All
            </Link>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 text-left max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#228B22] mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At Ecoveza, we are dedicated to providing sustainable and organic
            products. Our mission is to reduce the carbon footprint by offering
            eco-friendly alternatives that benefit both you and the planet.
          </p>
          <p className="text-lg text-gray-700">
            From eco-friendly packaging to organic skincare, we ensure every
            product we offer is ethically sourced and responsibly made.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
