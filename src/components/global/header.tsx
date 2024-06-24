"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";
import { BackgroundGradient } from "../ui/background-gradient";
import SidebarButton from "@/components/global/sidebar";

type Props = {};

const Navbar = () => {
  //   const [toggle, setToggle] = React.useState(false);
  const menuItems = [
    {
      title: "Home",
      url: "/",
      description: "Home Page",
    },
    {
      title: "About Us",
      url: "/about-us",
      description: "Know more about us"
    },
    {
      title: "Events",
      url: "/events",
      description: "Check out our events"
    },
    {
      title: "Our Team",
      url: "/our-team",
      description: "Meet our team"
    },
    {
      title: "Blogs",
      url: "/blogs",
      description: "Read our blogs"
    },
    {
      title: "Register",
      url: "/register",
      description: "Register with us"
    },
  ];
  const pathName = usePathname();
  return (
    <header className="h-[20%] lg:px-16 px-6 md:px-10 flex flex-row items-center justify-between border-white">
      <Image
        src="/nav-logo.png"
        width={300}
        height={150}
        alt="Alexa Developers SRM Logo"
        className="shadow-sm object-contain w-52 md:w-52 lg:w-60 h-auto xl:w-80"
        priority
      />

      <aside className="flex items-center justify-center my-4">
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4 2xl:gap-20 lg:gap-14 md:gap-5 list-none text-white">
            {menuItems.map((item, index) => {
              return pathName === item.url ? (
                <BackgroundGradient key={index} className="px-2 bg-transparent">
                  <li className={clsx("bg-transparent")}>
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                </BackgroundGradient>
              ) : (
                <li key={index} className={clsx("bg-transparent hover:font-bold")}>
                  <Link href={item.url}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SidebarButton menuItems={menuItems}/>
      </aside>
    </header>
  );
};

export default Navbar;