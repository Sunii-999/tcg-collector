"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
// Ensure this path is correct for your Next.js Server Action
import { signout } from '@/app/(auth)/actions'; 

const NavButton = ({ href, label }) => (
    <Link href={href} key={label}>
        <span
            className="px-8 py-2 rounded-full bg-gradient-to-b from-[hsla(221,20%,72%,0)] to-[#51585f75] text-white text-sm font-bold shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.5)] transition-colors duration-150 hover:bg-[#51585f75]/80"
        >
            {label}
        </span>
    </Link>
);


const navItems = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "MyCollection",
        href: "/my-collection",
    },
    {
        label: "Cards",
        href: "/cards",
    },
    {
        label: "Sets",
        href: "/sets",
    }
    // Note: Profile is handled separately for the dropdown
]

const Navbar = () => {
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    return (
        <div className="h-25 w-full sticky top-0 z-50">
            <nav className="max-w-[50%] m-auto relative ">
                <div className="absolute">
                    <img src="/nav-bar-gradient.png" alt=" navbar gradient" />
                </div>
                <div className="absolute w-[100%] mt-5">
                    <div
                        className="flex gap-4 items-center justify-center"
                    >
                        {/* Logo */}
                        <Image
                            src="/logo.png"
                            alt="TCG LOGO"
                            width={36}
                            height={36}
                        />
                        
                        {/* Map all standard nav items */}
                        {navItems.map((item) => (
                            <NavButton key={item.label} href={item.href} label={item.label} />
                        ))}
                        
                        {/* Profile Link with Dropdown */}
                        <div
                            // This parent div makes the dropdown relative to the Profile button
                            className="relative" 
                            onMouseEnter={() => setIsProfileHovered(true)}
                            onMouseLeave={() => setIsProfileHovered(false)}
                        >
                            {/* Profile Button */}
                            <NavButton href="/profile" label="Profile" />

                            {/* Dropdown Menu - position it using absolute right-0 top-full */}
                            <div
                                className={`absolute right-0 top-full mt-2 w-40 bg-[#3a4046] rounded-lg shadow-xl z-10 
                                ${isProfileHovered ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-200`}
                            >
                                <form action={signout}>
                                    <button
                                        type="submit"
                                        className="w-full text-left px-4 py-2 text-white text-sm hover:bg-[#51585f] rounded-lg cursor-pointer"
                                        onClick={() => setIsProfileHovered(false)} // Close dropdown on click
                                    >
                                        Signout 🚪
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar