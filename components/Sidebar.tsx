"use client";

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import menuItems from '../public/data/menuItems.json';

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current path

  // Function to check if the current path matches a dynamic alias
  const isActive = (path: string, aliases: string[] | undefined): boolean => {
    // Check if the pathname matches the exact path
    if (pathname === path) {
      return true;
    }
    // If there are aliases, check if the pathname matches any of the dynamic aliases
    if (aliases) {
      return aliases.some(alias => {
        // Convert alias to a regular expression for matching
        const regex = new RegExp('^' + alias.replace(/{[^}]+}/g, '[^/]+') + '$');
        return regex.test(pathname);
      });
    }
    return false;
  };

  return (
    <div className="fixed h-screen bg-white min-w-20 w-20 xl:w-60 lg:w-60 transition-width duration-300 xl:p-7 lg:p-7 py-7 px-1 flex flex-col items-center justify-start">
      <div className="flex flex-row items-center justify-center w-full">
        <h1 className="text-primary font-bold text-lg xl:text-2xl lg:text-2xl md:block break-all">SALADMAKER</h1>
        <h1 className="text-secondary font-bold text-lg md:block self-end">.</h1>
      </div>

      <div className="mt-5 text-tertiary flex flex-col xl:items-start lg:items-start items-center justify-center xl:w-full lg:w-full gap-2">
        {menuItems.map((item, index) => {
          const isActiveItem = isActive(item.path, item.aliases);

          return (
            <Link key={index} href={item.path} className={`flex items-center lg:py-3 lg:px-4 p-2 rounded-xl w-full ${isActiveItem ? 'bg-secondary text-white' : 'hover:shadow-md'}`}>
              <Image
                src={`/assets/icons/${item.icon}_${isActiveItem ? 'active' : 'inactive'}.png`}
                alt={item.name}
                width={24}
                height={24}
                className="lg:mr-3 xl:mr-3 mr-0"
              />
              <span className="hidden lg:block">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
