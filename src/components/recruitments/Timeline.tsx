import React from "react";

type Props = {};

const Timeline = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black px-10 py-20">
      {/* Header */}
      <h1 className="text-8xl font-bold text-white mb-12">
        Road to <span className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent">Alexa</span>
      </h1>

      {/* Timeline container */}
      <div className="relative w-full max-w-[800px]">
        {/* Vertical Line */}
        <div className="absolute left-[calc(50%-1px)] h-full w-[2px] bg-white"></div>

        {/* Timeline Items */}
        <div className="space-y-14">
          {/* Registration */}
          <div className="relative flex items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-1/2 text-left pl-8 ml-auto">
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-3xl font-bold">Registration</h2>
              <p className="text-white text-[20px]">
                Fill the form below by entering required details to get your journey started!
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="relative flex items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-1/2 text-right pr-8 mr-auto">
              <h2 className="bg-gradient-to-r from-[#00CDC1] to-[#00B5FF] bg-clip-text text-transparent text-3xl font-bold">Email</h2>
              <p className="text-white text-[20px]">
                Keep yourself up to date by checking your registered email on the regular. (Sneak a peek in the spam folder too)
              </p>
            </div>
          </div>

          {/* Tests/Tasks */}
          <div className="relative flex items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-1/2 text-left pl-8 ml-auto">
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-3xl font-bold">Tests/Tasks</h2>
              <p className="text-white text-[20px]">
                Showcase your talent through tests or tasks to make your mark among the competitors.
              </p>
            </div>
          </div>

          {/* Interviews */}
          <div className="relative flex items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-1/2 text-right pr-8 mr-auto">
              <h2 className="bg-gradient-to-r from-[#00CDC1] to-[#00B5FF] bg-clip-text text-transparent text-3xl font-bold">Interviews</h2>
              <p className="text-white text-[20px]">
                You are just one step away. Keep calm and get ready for a small, casual interview.
              </p>
            </div>
          </div>

          {/* Welcome */}
          <div className="relative flex items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-1/2 text-left pl-8 ml-auto">
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-3xl font-bold">Welcome</h2>
              <p className="text-white text-[20px]">
                You are now officially a part of the Alexa Developers SRM family. Much surprises await on the other side!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
