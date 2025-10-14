// app/components/home/FeaturedSectionServer.tsx
import FeaturedCards from "@/components/home/featured/FeaturedCards";
import FeaturedSectionClient from "@/components/home/featured/FeaturedSectionClient";

export default async function FeaturedSectionServer() {
  const cards = await FeaturedCards(); // server-rendered content
  return <FeaturedSectionClient cards={cards} />;
}
