'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeaturedCards from '@/components/home/featured/FeaturedCards';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set([titleRef.current, textRef.current, buttonRef.current], {
      opacity: 0,
      y: 50,
    });
    gsap.set(cardsRef.current, { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        end: 'bottom center',
        toggleActions: 'play none none none',
      },
    });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        cardsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.3'
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.6'
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        bg-white text-black text-center min-h-screen px-6 py-20
        flex flex-col items-center justify-center
        overflow-hidden
      "
    >
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-10">
        {/* Title + Text */}
        <div className="flex flex-col items-center justify-center gap-6 w-full px-2">
          <h1
            ref={titleRef}
            className="
              text-4xl font-bold md:text-6xl leading-tight
            "
          >
            A place to collect
          </h1>

          <p
            ref={textRef}
            className="
              text-base md:text-lg text-gray-700 max-w-2xl
            "
          >
            Effortlessly track your entire collection—no matter the size.
            See your progress for every individual set at a glance, finally
            retiring those manual spreadsheets.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="w-full overflow-visible flex justify-center"
        >
          <FeaturedCards />
        </div>

        {/* Button */}
        <div ref={buttonRef} className="mt-6">
          <Link href="/sign-up">
            <Button
              className="hover:cursor-pointer"
              variant="blackBtn"
            >
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
