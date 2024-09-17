import React from 'react';

const Banner: React.FC = () => {
  return (
    <section className="text-center bg-cover bg-center py-24 text-white" style={{ backgroundImage: 'url("/path-to-banner-image.jpg")' }}>
      <h1 className="text-5xl font-bold mb-4">Recruitments '24</h1>
      <p className="text-lg mb-8">The official developers' club of Amazon Alexa at SRMIST is now open for recruiting!</p>
      <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
        Register Now
      </button>
    </section>
  );
};

export default Banner;
