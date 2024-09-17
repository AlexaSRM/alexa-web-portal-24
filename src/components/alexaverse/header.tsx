"use client";
// app/components/Header.tsx
import { url } from 'inspector';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { title } from 'process';
import clsx from 'clsx';

const Header: React.FC = () => {
  const pathName = usePathname();
  const menuItems = [
    {
      title: 'Home',
      url: '/alexaverse',
      description: 'Alexaverse Page'
    },
    // {
    //   title: 'Our Events',
    //   url: '/alexaverse#our-events',
    //   description: 'Check out our events'
    // }
  ]

  return (
    <header className="z-20 h-[20%] lg:px-10 px-6 md:px-10 flex flex-row items-center justify-between border-white">
      <Link href="/alexaverse">
        <Image
          src="/alexaverse/alexalogo.png"
          width={300}
          height={150}
          alt="Alexa Developers SRM Logo"
          className="hidden sm:block shadow-sm object-contain py-4 w-52 md:w-52 lg:w-60 h-auto xl:w-72"
          priority
        />
        <Image
          src="/alexaverse/alexalogoonly.png"
          width={50}
          height={50}
          alt="Alexa Developers SRM Logo"
          className="sm:hidden shadow-sm object-contain py-4 w-10 h-auto"
          priority
        />
      </Link>

      <aside className="flex flex-row items-center justify-center my-4">
        <nav className="">
          <ul className="flex items-center md:text-lg gap-4 2xl:gap-20 lg:gap-14 md:gap-5 list-none tracking-widest">
            {menuItems.map((item, index) => {
              return pathName === item.url ? (
                  <li className={clsx("bg-transparent text-[#980f35]")} key={index}>
                    <Link href={item.url}>{item.title}</Link>
                  </li>
              ) : (
                <li
                  key={index}
                  className={clsx("bg-transparent hover:font-bold text-[#Af6922]")}
                >
                  <Link href={item.url} scroll={true}>
                    <button className="px-6 py-2rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                      {item.title}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* <SidebarButton menuItems={menuItems} /> */}
        {/* <SideMenu /> */}
      </aside>
    </header>
  );
};

export default Header;
