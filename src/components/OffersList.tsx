import { useState, useEffect } from 'react';
import OfferCard from './OfferCard';
import { Offer } from '../types/offer';

interface OffersListProps {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
  }, [activeCard]);

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

