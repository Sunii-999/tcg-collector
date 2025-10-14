'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useEffect
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
];

export default function Navbar() {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); // New state for scroll

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than the viewport height
      // window.innerHeight is equivalent to h-screen
      setHasScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    // Conditional styling on the main container for a simple background transition
    <div className={`fixed top-0 left-0 w-full z-50 py-4 transition-colors duration-300
      ${hasScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}
    `}>
      <nav className="flex items-center justify-center gap-6 max-w-[70%] mx-auto">
        {/* Logo - not blurred */}
        <Image
          src="/logo.png"
          alt="TCG LOGO"
          width={40}
          height={40}
          className="select-none"
        />

        {/* 🍸 Liquid glass nav area */}
        <div
          className="
            relative flex items-center gap-4 px-10 py-3 rounded-3xl
          "
        >
          {/* Subtle shimmering gradient layer - adjusted to span full size of parent */}
          <div
            className={`
              absolute inset-0 rounded-3xl transition-opacity duration-300
              ${hasScrolled ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {/* Keeping the dark background color */}
             <div className="absolute inset-0 bg-[#1E1E1E] rounded-3xl" />
          </div>
          
          {/* Add a new background layer for the scrolled state */}
           <div
            className={`
              absolute inset-0 rounded-3xl border border-white/20 backdrop-blur-md
              bg-black/50 transition-opacity duration-300
              ${hasScrolled ? 'opacity-100' : 'opacity-0'}
            `}
           />

          {navItems.map((item) => (
            // Ensure NavButtons are above the background layers
            <div key={item.label} className="relative z-10"> 
                <NavButton href={item.href} label={item.label} />
            </div>
          ))}

          {/* Profile dropdown */}
          <div
            className="relative z-10" // Ensure profile button is above background layers
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            <NavButton href="/profile" label="Profile" />

            {/* Dropdown with same liquid glass effect */}
            <div
              className={`
                absolute right-0 top-full mt-3 w-44 overflow-hidden z-20
                rounded-2xl border border-white/20 backdrop-blur-xl
                bg-gradient-to-br from-white/15 to-white/5
                shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),0_8px_30px_rgba(0,0,0,0.3)]
                transform transition-all duration-200
                ${isProfileHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
              `}
            >
              <form action={signout}>
                <button
                  type="submit"
                  className="
                    w-full text-left px-5 py-2 text-sm text-white/90 font-medium
                    hover:bg-white/20 transition-colors cursor-pointer
                  "
                  onClick={() => setIsProfileHovered(false)}
                >
                  Sign out 🚪
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}