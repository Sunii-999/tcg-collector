import Link from 'next/link';
// 1. Import the necessary icons from lucide-react
import { Twitter, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { SiDiscord, SiX } from 'react-icons/si'; // SiX is the new Twitter logo


export default function Footer() {

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'My Collection', href: '/my-collection' },
    { label: 'Cards', href: '/cards' },
    { label: 'Sets', href: '/sets' },
    { label: 'Profile', 'href': '/profile' },
  ];

  // 2. Define your social media links
  const socialLinks = [
    // Using Lucide's Twitter icon
    { icon: Twitter, href: 'https://twitter.com/your-username', label: 'Twitter' },
    // Using Lucide's MessageSquare as a stand-in for Discord
    { icon: SiDiscord, href: 'https://discord.gg/your-invite', label: 'Discord' },
    // Example of another link
    { icon: LinkIcon, href: 'https://portfolio-swart-one-35.vercel.app', label: 'Blog' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E1E] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Navigation and Social Icons Section */}
        <div className="flex flex-col items-center border-b border-gray-700 pb-6 mb-6">
            
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center space-x-6 md:space-x-10 mb-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium hover:text-indigo-400 transition duration-150 ease-in-out py-1">
                {item.label}
              </Link>
            ))}
          </nav>
            
          {/* Social Icons */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
                // 3. Render the icon and link
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition duration-150 ease-in-out"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Info/Copyright Section */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Sunii. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Built for awesome collectors.
          </p>
        </div>
      </div>
    </footer>
  );
}