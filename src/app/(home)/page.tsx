import Link from "next/link";
import { Button } from "@/components/ui/button";

import HeroAnimation from "@/components/home/heroAnimation"; 
import FeaturedSection from "@/components/home/FeaturedSection";

export default function Home() {
    return (
        <>
            {/* --- Hero Section (White/Blue Text) --- */}
            <div className="text-center h-screen flex flex-col items-center gap-10 text-white ">
                <div className="pt-20">
                    <h1
                        className="text-6xl font-bold"
                    >
                        Mega Evolution series
                    </h1>
                    <p
                        className="text-[#2AC5EC]"
                    >
                        November 14 2025
                    </p>
                </div>

                <HeroAnimation 
                    src="/phantasmal-flames.png" 
                    alt="Mega Evolution series : Phantasmal Flames"
                    className="w-[25%] drop-shadow-2xl"
                />

                <Link href="/sign-up">
                    <Button className="hover:cursor-pointer">
                        Create account
                    </Button>
                </Link>
            </div>
            <FeaturedSection />
        </>
    )
}