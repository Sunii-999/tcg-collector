'use client' // This component is now responsible for client-side interactivity

import { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import Link from "next/link"; // Link is only client-side if it needs interactivity

type HeroAnimationProps = {
    src: string;
    alt: string;
    className: string;
}

export default function HeroAnimation({ src, alt, className }: HeroAnimationProps) {
    const imageRef = useRef(null);
    const linkRef = useRef(null); // Keep linkRef if you plan to animate the Link as well

    useEffect(() => {
        const image = imageRef.current;
        
        if (!image) return;

        gsap.set(image, { transformOrigin: "center center" });

        gsap.to(image, {
            y: -10,
            rotation: "-=1",
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <img 
                ref={imageRef} 
                src={src} 
                alt={alt}
                className={className} 
            />
            {/* You can simplify/remove the second Link if it's just decorative */}
            <Link
                ref={linkRef}
                href="/sign-up"
            >
                {/* This link was empty in your original code, so it's kept empty here */}
            </Link>
        </div>
    )
}