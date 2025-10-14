'use client'

import { useRef, useEffect } from 'react'; // 👈 Import useRef and useEffect
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
        gsap.set(buttonRef.current, { opacity: 0, y: 20 });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 })
            .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: -0.8 }, "<")
            .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.8, delay: -0.5 },);
    }, []);
    return (
        <>
            <div className="text-center h-screen flex flex-col items-center gap-10 pt-20 text-white ">

                <div className="pt-20">
                    <h1
                        className="text-6xl font-bold"
                        ref={titleRef}
                    >
                        Mega Evolution series
                    </h1>
                    <p
                        className="text-[#2AC5EC]"
                        ref={subtitleRef}
                    >
                        November 14 2025
                    </p>
                </div>
                <HeroAnimation 
                    src="/phantasmal-flames.png" 
                    alt="Mega Evolution series : Phantasmal Flames"
                    className="w-[25%] drop-shadow-2xl"
                />
                <Link
                    href="/sign-up"
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