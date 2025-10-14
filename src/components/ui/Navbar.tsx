'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signout } from '@/app/(auth)/actions';

const NavButton = ({ href, label }: { href: string; label: string }) => (
  <Link href={href}>
    <span
      className="
        px-6 py-2 rounded-full text-white/90 text-sm font-semibold
        transition-all duration-200
        hover:bg-white/30 hover:text-white
      "
    >
      {label}
    </span>
  </Link>
);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'My Collection', href: '/my-collection' },
  { label: 'Cards', href: '/cards' },
  { label: 'Sets', href: '/sets' },
  { label: 'Profile', href: '/profile' },
];

export default function Navbar() {
  const [isProfileHovered, setIsProfileHovered] = useState(false); 
  const [hasScrolled, setHasScrolled] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div className={`fixed top-0 left-0 w-full z-50 py-4 transition-colors duration-300
      ${hasScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}
    `}>
      <nav className="flex items-center justify-center gap-6 max-w-[70%] mx-auto">
        <Image
          src="/logo.png"
          alt="TCG LOGO"
          width={40}
          height={40}
          className="select-none"
        />

        <div
          className="
            relative flex items-center gap-4 px-10 py-3 rounded-3xl
          "
        >
          <div
            className={`
              absolute inset-0 rounded-3xl transition-opacity duration-300
              ${hasScrolled ? 'opacity-0' : 'opacity-100'}
            `}
          >
             <div className="absolute inset-0 bg-[#1E1E1E] rounded-3xl" />
          </div>
          
           <div
            className={`
              absolute inset-0 rounded-3xl border border-white/20 backdrop-blur-md
              bg-black/50 transition-opacity duration-300
              ${hasScrolled ? 'opacity-100' : 'opacity-0'}
            `}
           />

          {navItems.map((item) => (
            <div key={item.label} className="relative z-10"> 
                <NavButton href={item.href} label={item.label} />
            </div>
          ))}

        </div>
      </nav>
    </div>
  );
}