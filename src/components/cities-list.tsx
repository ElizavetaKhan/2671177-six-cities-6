import { memo } from 'react';

interface CitiesListProps {
    cities: string[];
    selectedCity: string;
    onCityChange: (city: string) => void;
  }

function CitiesListComponent({ cities, selectedCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city === selectedCity ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CitiesList = memo(CitiesListComponent);
export default CitiesList;
