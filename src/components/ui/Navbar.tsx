'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { signout } from '@/app/(auth)/actions';

// --- Sub-Component ---
const NavButton = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="
      px-5 py-2 rounded-full text-white/90 text-sm font-semibold
      transition-colors duration-200 block text-center
      hover:bg-white/20 hover:text-white
    "
  >
    {label}
  </Link>
);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'My Collection', href: '/my-collection' },
  { label: 'Cards', href: '/cards' },
  { label: 'Sets', href: '/sets' },
];

// --- Main Component ---
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      {/* Wrapper: Fixed only on desktop */}
      <div
        className={`
          top-0 left-0 w-full z-50 py-4 transition-colors duration-300
          ${hasScrolled ? 'md:fixed md:bg-black/80 md:backdrop-blur-md' : 'md:fixed md:bg-transparent'}
        `}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="TCG LOGO"
              width={40}
              height={40}
              className="select-none"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative flex items-center gap-4 px-8 py-2 rounded-3xl">
              {/* Background */}
              <div
                className={`
                  absolute inset-0 rounded-3xl transition-all duration-300
                  ${hasScrolled ? 'bg-black/50 border border-white/10 backdrop-blur-md' : 'bg-[#1E1E1E]'}
                `}
              />
              {/* Nav Items */}
              {navItems.map((item) => (
                <div key={item.label} className="relative z-10">
                  <NavButton href={item.href} label={item.label} />
                </div>
              ))}
            </div>
          </div>

          {/* Profile / Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div
              className="hidden md:block relative"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <Link href="/profile" className="text-white hover:text-indigo-400 transition">
                <User className="w-6 h-6" />
              </Link>

              {isProfileHovered && (
                <div className="absolute right-0 mt-3 w-40 bg-[#1E1E1E] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <form action={signout}>
                    <button
                      type="submit"
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-full hover:bg-white/20 transition"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- Mobile Side Drawer --- */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={toggleMobileMenu}
      />

      <div
        className={`
          fixed top-0 h-full w-screen bg-[#1E1E1E] border-l border-gray-700 z-50
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-6 space-y-6">
            <div className="flex items-end justify-end w-full">
                <button
                    onClick={toggleMobileMenu}
                    className="text-white hover:text-gray-300 transition"
                    aria-label="Close menu"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-4 flex-grow text-right mt-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={toggleMobileMenu}
                className="text-white text-lg font-medium hover:text-indigo-400 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Sign Out */}
          <form action={signout} className="pt-4 border-t border-gray-700">
            <button
              type="submit"
              className="w-full flex justify-end items-center gap-2 text-red-400 text-base font-semibold hover:text-red-300 transition"
              onClick={toggleMobileMenu}
            >
              <span>Sign Out</span>
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
