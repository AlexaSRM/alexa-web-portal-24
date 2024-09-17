import React from 'react';

const Timeline: React.FC = () => {
  const steps = [
    { name: 'Registration', description: 'Fill the form...', step: 1 },
    { name: 'Email', description: 'Keep up with your emails...', step: 2 },
    { name: 'Tests/Tasks', description: 'Let the fire in you be kindled...', step: 3 },
    { name: 'Interviews', description: 'Get ready for a small interview...', step: 4 },
    { name: 'Welcome', description: 'Congratulations, you made it...', step: 5 },
  ];

  return (
    <section id="roadmap" className="py-16 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Road to Alexa</h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute inset-0 w-1 bg-gray-700 left-1/2 transform -translate-x-1/2"></div>
        {steps.map((step, index) => (
          <div key={index} className="flex items-center justify-between mb-12">
            <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2">{step.name}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              {step.step}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
