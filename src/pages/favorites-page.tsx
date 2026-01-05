import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { AppRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import FavoriteCard from '../components/favorite-card';
import { getAllOffers, getAuthorizationStatus, getUser, getFavoriteOffersCount } from '../store/selectors';
import { AppDispatch } from '../store';
import { fetchFavoriteOffersAction, logoutAction, toggleFavoriteAction } from '../store/action';
import Spinner from '../components/spinner';

function FavoritesPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const allOffers = useSelector(getAllOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const favoriteOffersCount = useSelector(getFavoriteOffersCount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchFavoriteOffersAction());
      } catch {
        // Ошибка загрузки избранных обрабатывается автоматически Redux
      } finally {
        setIsLoading(false);
      }
    };

    if (authorizationStatus === AuthorizationStatus.Auth) {
      loadFavorites();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, authorizationStatus]);

  const groupedByCity = useMemo(() => {
    const favoriteOffers = allOffers.filter((offer) => offer.isFavorite);
    return favoriteOffers.reduce((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {} as Record<string, Offer[]>);
  }, [allOffers]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const handleFavoriteClick = useCallback((offerId: string) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      return;
    }

    const targetOffer = allOffers.find((o) => o.id === offerId);
    if (targetOffer && targetOffer.isFavorite) {
      dispatch(toggleFavoriteAction(offerId, false));
    }
  }, [dispatch, authorizationStatus, allOffers]);

  const hasFavorites = Object.keys(groupedByCity).length > 0;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
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
                        <span className="header__favorite-count">{favoriteOffersCount}</span>
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

      <main className={`page__main page__main--favorites ${!hasFavorites && !isLoading ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isLoading && <Spinner />}
          {!isLoading && hasFavorites && (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedByCity).map(([cityName, cityOffers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <FavoriteCard key={offer.id} offer={offer} onFavoriteClick={handleFavoriteClick} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!isLoading && !hasFavorites && (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
