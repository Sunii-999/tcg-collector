// Import the new Client Component
import HeroSection from "@/components/home/HeroSection";
import { getFeaturedCards } from '@/lib/pokemon-api'
import CardList from '@/components/cards/CardList'

export default async function Home() {

      const cards = await getFeaturedCards(3)

    return (
        <>
            <HeroSection />
            <CardList cards={cards} />

        </>
    )
}