// src/AboutUs.tsx
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#F5F5DC] text-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center text-[#228B22] mb-6">About Us</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#228B22] mb-4">Welcome to Ecoveza</h2>
        <p className="mb-4">
          At Ecoveza, we believe in the power of nature and the importance of sustainable living. Our mission is to provide high-quality, organic products that not only nourish your body but also contribute to the health of our planet. Nestled in the heart of lush landscapes, our commitment to organic farming and eco-friendly practices is at the core of everything we do.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#228B22] mb-4">Our Story</h2>
        <p className="mb-4">
          Founded by a passionate group of environmentalists and food enthusiasts, Ecoveza began as a dream to create a healthier lifestyle for individuals and families. With roots in the community and a love for all things organic, we set out to cultivate an inclusive space where people could discover the benefits of organic products and learn about sustainable practices.
        </p>
        <p className="mb-4">
          As we grew, our vision expanded to encompass a holistic approach to health and wellness, recognizing that what we put into our bodies is intrinsically linked to the health of our environment.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#228B22] mb-4">Our Values</h2>
        <ul className="list-disc ml-8 mb-4">
          <li><strong>Sustainability:</strong> We are dedicated to sustainable farming practices that protect our planet for future generations.</li>
          <li><strong>Quality:</strong> Every product we offer undergoes rigorous testing and is certified organic, ensuring that you receive only the best.</li>
          <li><strong>Community:</strong> We prioritize building strong relationships with our farmers, suppliers, and customers.</li>
          <li><strong>Education:</strong> We are committed to educating our customers about the benefits of organic living and the impact of their choices.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#228B22] mb-4">Our Commitment to the Earth</h2>
        <p className="mb-4">
          At Ecoveza, we understand that our actions have consequences. That's why we strive to minimize our carbon footprint through eco-friendly packaging, energy-efficient practices, and partnerships with local environmental organizations.
        </p>
        <p>
          We believe in giving back to the earth, and a portion of our profits goes toward conservation efforts and initiatives that protect our planet.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-[#228B22] mb-4">Join Us on This Journey</h2>
        <p className="mb-4">
          We invite you to join us on our journey towards a healthier, more sustainable future. Together, we can make a difference—one organic product at a time.
        </p>
        <p>
          Explore our range of organic goods, participate in our community events, and let’s work together to create a thriving ecosystem for ourselves and generations to come.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#228B22] mb-4">Contact Us</h2>
        <p>If you have any questions or would like to learn more about our products and initiatives, please don’t hesitate to reach out. We’re here to help you on your path to sustainable living.</p>
      </section>
    </div>
  );
};

export default AboutUs;
