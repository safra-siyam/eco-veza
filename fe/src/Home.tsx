// src/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import img1URL from './assets/latest1.jpeg';
import img2URL from './assets/latest2.jpeg';
import img3URL from './assets/latest3.jpeg';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5DC] p-6 flex items-center justify-center">
      <div className="container mx-auto text-center space-y-20">
        
        {/* Header Section */}
        <header className="space-y-6">
          <h1 className="text-6xl font-extrabold text-[#228B22] drop-shadow-md tracking-wide">
            Save the Planet Earth!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover eco-friendly products and join a global movement for a greener future.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Shop Now
          </Link>
        </header>

        {/* Image Section */}
        <section className="relative">
          <img
            src="../src/assets/twig.jpeg"
            alt="Nature Image"
            className="w-full max-w-4xl mx-auto shadow-lg rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </section>

        {/* Latest Arrivals Section */}
        <section className="space-y-8">
          <h2 className="text-4xl font-semibold text-[#228B22]">
            Our Latest Arrivals
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our newest additions and find something special to support a greener lifestyle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-5xl">
            {[img1URL, img2URL, img3URL].map((img, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <img
                  src={`${img}`}
                  alt={`Latest Arrival ${index + 1}`}
                  className="w-full h-80 object-cover"
                />
              </div>
            ))}
          </div>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out mt-4"
          >
            View More
          </Link>
        </section>

        {/* Mission Section */}
        <section className="bg-[#E8F5E9] p-10 rounded-lg shadow-lg space-y-4 max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#228B22]">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Ecoveza, our mission is to empower eco-conscious choices by offering sustainable, responsibly made products. Every item in our catalog supports a greener future.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From biodegradable packaging to organic ingredients, we ensure every product you buy is good for you and the planet.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Home;
