import React from "react";
import { FaLeaf, FaSeedling, FaHandsHelping, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#F5F5DC] text-gray-800 p-8">
      <div className="container mx-auto space-y-16 max-w-4xl">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-[#228B22]">About Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover our journey, mission, and the values that make Ecoveza a
            unique destination for sustainable living.
          </p>
        </header>

        {/* Welcome Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#228B22]">
            Welcome to Ecoveza
          </h2>
          <p>
            At Ecoveza, we believe in nurturing the planet while enhancing the
            quality of life. Our products are crafted to reflect sustainable
            practices, focusing on health and environmental well-being.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#228B22]">Our Story</h2>
          <p>
            Eco-Veza was born from a shared passion for organic living and
            environmental care. Founded with a commitment to protecting the
            environment, our brand has grown to embrace a holistic approach,
            connecting personal health with ecological well-being.{" "}
          </p>
        </section>

        {/* Our Values Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#228B22]">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <FaLeaf className="text-[#228B22] text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Sustainability</h3>
                <p>
                  Dedicated to eco-friendly practices that protect our planet
                  for future generations.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaSeedling className="text-[#228B22] text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Quality</h3>
                <p>
                  Our products are rigorously tested and certified organic,
                  guaranteeing top quality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaHandsHelping className="text-[#228B22] text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Community</h3>
                <p>
                  We foster relationships with farmers, suppliers, and customers
                  to build a sustainable community.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FaHeart className="text-[#228B22] text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Education</h3>
                <p>
                  We educate our community on the importance of organic living
                  and sustainable choices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#228B22]">
            Our Commitment to the Earth
          </h2>
          <p>
            Ecoveza is committed to reducing our carbon footprint through
            eco-friendly packaging, energy-efficient practices, and partnerships
            with environmental organizations. We reinvest in nature, with a
            portion of profits going towards conservation initiatives.
          </p>
        </section>

        {/* Join Us Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-[#228B22]">
            Join Us on This Journey
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We invite you to join us in creating a sustainable future, one
            organic product at a time. Explore our collection and participate in
            our community events to make a lasting impact together.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Discover Our Products
          </Link>
        </section>

        {/* Contact Us Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-[#228B22]">Contact Us</h2>
          <p className="text-lg mt-2">
            Have questions? Want to know more about our products and
            initiatives? Reach out to us—we’re here to support your sustainable
            journey!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
