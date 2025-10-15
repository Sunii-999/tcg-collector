'use client'

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroAnimation from "./HeroAnimation";

export default function HeroSection() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (!titleRef.current || !subtitleRef.current || !buttonRef.current) {
            console.error("GSAP Ref is null. Animation canceled.");
            return;
        }

        // Use gsap.set for initial state (especially for elements that should animate)
        gsap.set(buttonRef.current, { opacity: 0, y: 20 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(titleRef.current, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 1.2 }
            )
            .fromTo(subtitleRef.current, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 1, delay: -0.8 }, 
                "<" // Start simultaneously with the previous animation
            )
            .to(buttonRef.current, 
                { opacity: 1, y: 0, duration: 0.8, delay: -0.5 }
            );
    }, []);

    return (
        // Adjusted: min-h-screen instead of h-screen for better mobile scrolling
        <div className="text-center min-h-screen flex flex-col items-center justify-center pb-10 text-white px-4"> 
            
            {/* Added: Responsive vertical gap for smaller screens */}
            <div className="flex flex-col items-center gap-4 md:gap-8"> 

                <div className="pt-10 md:pt-16">
                    <h1
                        // Adjusted: Responsive font sizes (4xl on small, 5xl on medium, 6xl on large)
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                        ref={titleRef}
                    >
                        Mega Evolution series
                    </h1>
                    <p
                        className="text-[#2AC5EC] text-lg md:text-xl mt-2"
                        ref={subtitleRef}
                    >
                        November 14 2025
                    </p>
                </div>

                {/* Adjusted: Responsive image width for all screen sizes */}
                <HeroAnimation 
                    src="/phantasmal-flames.png" 
                    alt="Mega Evolution series : Phantasmal Flames"
                    className="w-[80%] sm:w-[50%] md:w-[35%] lg:w-[25%] drop-shadow-2xl"
                />

                <Link
                    href="/sign-up"
                    ref={buttonRef} 
                    className="mt-6 md:mt-8" // Add margin on top of the link
                >
                    <Button 
                        // Added: Responsive padding for a larger button on desktop
                        className="hover:cursor-pointer px-8 py-3 text-lg md:text-xl"
                    >
                        Create account
                    </Button>
                </Link>
            </div>
        </div>
    );
}