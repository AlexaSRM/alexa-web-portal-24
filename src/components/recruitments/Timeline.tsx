import React from "react";

type Props = {};

const Timeline = (props: Props) => {
  return (
    <div id="timeline" className="flex flex-col items-center justify-center h-full md:h-screen bg-black px-5 md:px-10 py-20">
      {/* Header */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
        Road to <span className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent">Alexa</span>
      </h1>

      {/* Timeline container */}
      {/* Mobile Layout */}
      <div className="relative w-full max-w-[800px] md:hidden">
        {/* Vertical Line (Mobile: Left) */}
        <div className="absolute left-5 top-0 h-full w-[2px] bg-white"></div>

        {/* Timeline Items */}
        <div className="space-y-14">
          {/* Registration */}
          <div className="relative flex flex-col items-center">
            {/* Dot */}
            <div className="absolute left-[12px] w-[12px] h-[12px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full text-left pl-8 ml-auto mt-4"> {/* Changed to text-left */}
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-2xl font-bold">Registration</h2>
              <p className="text-white text-sm">
                Fill the form below by entering required details to get your journey started!
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="relative flex flex-col items-center">
            {/* Dot */}
            <div className="absolute left-[12px] w-[12px] h-[12px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full text-left pr-8 ml-auto mt-4"> {/* Changed to text-left */}
              <h2 className="bg-gradient-to-r from-[#00CDC1] to-[#00B5FF] bg-clip-text text-transparent text-2xl font-bold">Email</h2>
              <p className="text-white text-sm">
                Keep yourself up to date by checking your registered email regularly. (Sneak a peek in the spam folder too)
              </p>
            </div>
          </div>

          {/* Tests/Tasks */}
          <div className="relative flex flex-col items-center">
            {/* Dot */}
            <div className="absolute left-[12px] w-[12px] h-[12px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full text-left pl-8 ml-auto mt-4"> {/* Changed to text-left */}
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-2xl font-bold">Tests/Tasks</h2>
              <p className="text-white text-sm">
                Showcase your talent through tests or tasks to make your mark among the competitors.
              </p>
            </div>
          </div>

          {/* Interviews */}
          <div className="relative flex flex-col items-center">
            {/* Dot */}
            <div className="absolute left-[12px] w-[12px] h-[12px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full text-left pr-8 ml-auto mt-4"> {/* Changed to text-left */}
              <h2 className="bg-gradient-to-r from-[#00CDC1] to-[#00B5FF] bg-clip-text text-transparent text-2xl font-bold">Interviews</h2>
              <p className="text-white text-sm">
                You are just one step away. Keep calm and get ready for a small, casual interview.
              </p>
            </div>
          </div>

          {/* Welcome */}
          <div className="relative flex flex-col items-center">
            {/* Dot */}
            <div className="absolute left-[12px] w-[12px] h-[12px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full text-left pl-8 ml-auto mt-4"> {/* Changed to text-left */}
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-2xl font-bold">Welcome</h2>
              <p className="text-white text-sm">
                Congratulations! Get ready to enter the world of Alexa Developers SRM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex relative w-full max-w-[800px]">
        {/* Vertical Line (Center for Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white"></div>

        {/* Timeline Items */}
        <div className="space-y-14">
          {/* Registration */}
          <div className="relative flex flex-col md:flex-row items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full md:w-1/2 text-left pl-8 ml-auto mt-4">
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-2xl font-bold">Registration</h2>
              <p className="text-white text-lg">
                Fill the form below by entering required details to get your journey started!
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="relative flex flex-col md:flex-row items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full md:w-1/2 text-right pr-8 mr-auto mt-4">
              <h2 className="bg-gradient-to-r from-[#00CDC1] to-[#00B5FF] bg-clip-text text-transparent text-2xl font-bold">Email</h2>
              <p className="text-white text-lg">
                Keep yourself up to date by checking your registered email on the regular. (Sneak a peek in the spam folder too)
              </p>
            </div>
          </div>

          {/* Tests/Tasks */}
          <div className="relative flex flex-col md:flex-row items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full md:w-1/2 text-left pl-8 ml-auto mt-4">
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-2xl font-bold">Tests/Tasks</h2>
              <p className="text-white text-lg">
                Showcase your talent through tests or tasks to make your mark among the competitors.
              </p>
            </div>
          </div>

          {/* Interviews */}
          <div className="relative flex flex-col md:flex-row items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full md:w-1/2 text-right pr-8 mr-auto mt-4">
              <h2 className="bg-gradient-to-r from-[#00CDC1] to-[#00B5FF] bg-clip-text text-transparent text-2xl font-bold">Interviews</h2>
              <p className="text-white text-lg">
                You are just one step away. Keep calm and get ready for a small, casual interview.
              </p>
            </div>
          </div>

          {/* Welcome */}
          <div className="relative flex flex-col md:flex-row items-center">
            {/* Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[16px] h-[16px] bg-white rounded-full z-10"></div>
            {/* Text */}
            <div className="w-full md:w-1/2 text-left pl-8 ml-auto mt-4">
              <h2 className="bg-gradient-to-r from-[#00B5FF] to-[#00CDC1] bg-clip-text text-transparent text-2xl font-bold">Welcome</h2>
              <p className="text-white text-lg">
                Congratulations! Get ready to enter the world of Alexa Developers SRM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
