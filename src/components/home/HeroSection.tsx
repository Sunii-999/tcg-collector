'use client'

import { useRef, useEffect } from 'react'; // 👈 Import useRef and useEffect
import { gsap } from 'gsap';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroAnimation from "./HeroAnimation";

export default function HeroSection() {
    // 1. Create refs for the elements you want to animate
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    // INSIDE useEffect
useEffect(() => {
    // Check if all elements exist before running the timeline
    if (!titleRef.current || !subtitleRef.current || !buttonRef.current) {
        // If a ref is null, log an error or just return
        console.error("GSAP Ref is null. Animation canceled.");
        return; 
    }

    // 💡 FORCE initial state IMMEDIATELY for the button (common fix for Link/Button)
    gsap.set(buttonRef.current, { opacity: 0, y: 20 }); 

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ... rest of your timeline ...

    tl.fromTo(titleRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.2 } 
    )
    .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: -0.8 },
        "<" 
    )
    // 💡 Use a slightly shorter duration since we force-set the initial state
    .to(buttonRef.current,
        { opacity: 1, y: 0, duration: 0.8, delay: -0.5 }, 
    );
}, []);; // Empty dependency array means it runs once on mount

    return (
        <>
            <div className="text-center h-screen flex flex-col items-center gap-10 pt-20 text-white ">

                <div className="pt-20">
                    <h1
                        className="text-6xl font-bold"
                        ref={titleRef} // 👈 Assign ref
                    >
                        Mega Evolution series
                    </h1>
                    <p
                        className="text-[#2AC5EC]"
                        ref={subtitleRef} // 👈 Assign ref
                    >
                        November 14 2025
                    </p>
                </div>
                {/* HeroAnimation can handle its own animation internally */}
                <HeroAnimation 
                    src="/phantasmal-flames.png" 
                    alt="Mega Evolution series : Phantasmal Flames"
                    className="w-[25%] drop-shadow-2xl"
                />
                <Link
                    href="/sign-up"
                    // 👈 Ref is assigned to the Link wrapper, GSAP targets its child (the button)
                    ref={buttonRef} 
                >
                    <Button className="hover:cursor-pointer">
                        Create account
                    </Button>
                </Link>
            </div>
        </>
    );
}