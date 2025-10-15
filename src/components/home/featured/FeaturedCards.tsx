import { fetchPokemonCards } from '@/lib/pokemontcg';
import { Card } from '@/types/pokemontcg';

const getRandomCards = (cards: Card[], count: number): Card[] => {  
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards.slice(0, count);
};


const FeaturedCards = async () => {
  const cardsToSelect = 3;
  const fetchSampleSize = 30;
  let randomCards: Card[] = [];
  let error: string | null = null;

  try {
    const response = await fetchPokemonCards('random', 1, fetchSampleSize); 
    randomCards = getRandomCards(response.data, cardsToSelect);

  } catch (e) {
    console.error("Error fetching featured cards:", e);
    error = e instanceof Error ? e.message : 'Failed to load featured cards.';
  }

  if (error) return <div className="featured-cards-error">Error loading cards. Please check the API key and server console for details.</div>;
    
  const normalCardStyle = {
    width: '200px',
    transition: 'transform 0.3s ease-in-out',    
  };

  const featuredCardStyle = {
    width: '240px', // Bigger size (e.g., 20% larger)
    transform: 'translateY(-20px)', // Lift the card slightly
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <div className="featured-cards">
      <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 mt-6 md:mt-10">
        {randomCards.map((card, index) => {          
          const isFeatured = index === 1;
          const currentStyle = isFeatured ? featuredCardStyle : normalCardStyle;
          
          // New logic: Use 'hidden' on mobile (default) for non-featured cards, 
          // and 'block' on mobile for the featured card.
          // Then use 'md:block' to show all cards on medium screens and up.
          const visibilityClass = isFeatured 
            ? 'block' 
            : 'hidden md:block';

          return (
             <div 
              key={card.id} 
              className={`card-display ${visibilityClass}`} 
              style={{ textAlign: 'center', ...currentStyle }}
            >
              <img 
                src={card.images.large} 
                alt={card.name}                 
                style={{                   
                  width: '100%',
                  height: 'auto', 
                  borderRadius: '8px', 
                  boxShadow: '0 8px 15px rgba(0,0,0,0.3)' 
                }} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedCards;