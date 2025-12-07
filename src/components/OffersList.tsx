import { useState } from 'react';
import OfferCard from './OfferCard';
import { Offer } from '../mocks/offers';

interface OffersListProps {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard 
          key={offer.id} 
          offer={offer} 
          onMouseEnter={() => setActiveCard(offer.id)}
          onMouseLeave={() => setActiveCard(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;

