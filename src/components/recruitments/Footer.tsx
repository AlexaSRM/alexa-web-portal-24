import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 text-center">
      <p className="mb-4">Got any queries? Contact us at:</p>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://instagram.com/alexadev.srm" className="hover:text-gray-400">
          <i className="fab fa-instagram"></i> alexadev.srm
        </a>
        <a href="mailto:hello@alexadevsrm.com" className="hover:text-gray-400">
          <i className="fas fa-envelope"></i> hello@alexadevsrm.com
        </a>
      </div>
      <p className="text-gray-500">&copy; 2024 Alexa Developers SRM</p>
    </footer>
  );
};

export default Footer;
