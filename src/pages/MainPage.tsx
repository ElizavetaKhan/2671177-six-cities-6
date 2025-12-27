/**
 * компонент MainPage — главная страница сайта.
 * которая отображает секции из макета main.html
 */

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoute } from '../const';
import OffersList from '../components/OffersList';
import Map from '../components/Map';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { City, Points } from '../types/types';
import { RootState, AppDispatch } from '../store';
import { changeCity, fetchOffersAction, logout } from '../store/action';
import { AuthorizationStatus } from '../const';
import CitiesList from '../components/CitiesList';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const isOffersDataLoading = useSelector((state: RootState) => state.isOffersDataLoading);
  const offersDataError = useSelector((state: RootState) => state.offersDataError);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const user = useSelector((state: RootState) => state.user);

  const filteredOffers = allOffers.filter((offer) => offer.city.name === selectedCity);

  const cityCoordinates: City = filteredOffers[0]
    ? {
      lat: filteredOffers[0].city.location.latitude,
      lng: filteredOffers[0].city.location.longitude,
      zoom: filteredOffers[0].city.location.zoom,
    }
    : {
      // координаты по умолчанию
      lat: 52.38333,
      lng: 4.9,
      zoom: 10,
    };

  const points: Points = filteredOffers.map((offer) => ({
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    title: offer.title,
  }));

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img className="header__avatar user__avatar" src={user.avatarUrl} alt={user.name} width="20" height="20" />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{allOffers.filter((offer) => offer.isFavorite).length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={(e) => {
                        e.preventDefault(); handleLogout();
                      }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={CITIES}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              {offersDataError && (
                <ErrorMessage message={offersDataError} />
              )}
              {!offersDataError && isOffersDataLoading && (
                <Spinner />
              )}
              {!offersDataError && !isOffersDataLoading && (
                <>
                  <b className="places__found">
                    {filteredOffers.length} places to stay in {selectedCity}
                  </b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use href="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
                  <OffersList offers={filteredOffers} />
                </>
              )}
            </section>
            <div className="cities__right-section">
              <Map
                city={cityCoordinates}
                points={points}
                selectedPoint={undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
