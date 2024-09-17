import React from 'react';

const Domains: React.FC = () => {
  const domains = [
    { name: 'Technical', description: 'Lorem ipsum...', icon: '👨‍💻' },
    { name: 'Creatives', description: 'Lorem ipsum...', icon: '🎨' },
    { name: 'Events', description: 'Lorem ipsum...', icon: '📅' },
    { name: 'Business', description: 'Lorem ipsum...', icon: '💼' },
  ];

  return (
    <section id="domains" className="py-16 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Our Domains</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {domains.map((domain, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition">
            <div className="text-6xl mb-4">{domain.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{domain.name}</h3>
            <p className="text-gray-400">{domain.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Domains;
