// Import the new Client Component
import FeaturedSectionServer from "@/components/home/FeaturedSectionServer";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturedSectionServer />
        </>
    )
}