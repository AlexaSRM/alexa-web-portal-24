import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-black text-white">
      <div className="text-2xl font-bold">Alexa Developers SRM</div>
      <ul className="flex space-x-6">
        <li><a href="#home" className="hover:text-gray-400">Home</a></li>
        <li><a href="#domains" className="hover:text-gray-400">Domains</a></li>
        <li><a href="#roadmap" className="hover:text-gray-400">Roadmap</a></li>
      </ul>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        Register Now
      </button>
    </nav>
  );
};

export default Navbar;
