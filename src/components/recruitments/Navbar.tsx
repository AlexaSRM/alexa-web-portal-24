import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-black">
  <div className="flex items-center">
    <img
      src="/recruitment/AlexaLogo.png"
      alt="Alexa Developers SRM"
      className="w-[300px] mr-5"
    />
  </div>
  <div className="flex items-center space-x-8">
    <ul className="flex space-x-8 list-none">
      <li>
        <a
          href="/"
          className="text-[#00bcd4] text-[16px] no-underline transition-colors duration-300 hover:text-[#00bcd4]"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/domain"
          className="text-[#bbb] text-[16px] no-underline transition-colors duration-300 hover:text-[#00bcd4]"
        >
          Domain
        </a>
      </li>
      <li>
        <a
          href="/roadmap"
          className="text-[#bbb] text-[16px] no-underline transition-colors duration-300 hover:text-[#00bcd4]"
        >
          Roadmap
        </a>
      </li>
    </ul>
    <a
      href="/register"
      className="bg-gradient-to-r from-[#00bcd4] to-[#3bde87] text-white py-2 px-6 rounded-full text-[16px] font-medium no-underline transition-all duration-300 hover:bg-gradient-to-r hover:from-[#3bde87] hover:to-[#00bcd4]"
    >
      Apply Now
    </a>
  </div>
</nav>

  );
};

export default Navbar;
