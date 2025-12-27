import { useCallback } from 'react';
import OfferCard from './OfferCard';
import { Offer } from '../types/offer';

interface OffersListProps {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const handleMouseEnter = useCallback(() => {
    // activeCard будет использоваться для выделения точки на карте
  }, []);

  const handleMouseLeave = useCallback(() => {
    // activeCard будет использоваться для выделения точки на карте
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;

