import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginPage from '../../pages/LoginPage';
import FavoritesPage from '../../pages/FavoritesPage';
import OfferPage from '../../pages/OfferPage';
import PrivateRoute from '../private-route/PrivateRoute';
import { Offer } from '../../mocks/offers';

/**
 * Main component, that is connected to index.tsx
 */

interface AppProps {
    offers: Offer[];
}

function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {
            <MainPage offers={offers} />
          }
        />

        <Route
          path={AppRoute.Login}
          element = {<LoginPage/>}
        />

        <Route
          path={AppRoute.Favorites}
          element = {
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element = {<OfferPage offers={offers} />}
        />

        <Route
          path="*"
          element = {<ErrorPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
