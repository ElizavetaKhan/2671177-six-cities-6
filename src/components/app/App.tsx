import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page';
import ErrorPage from '../../pages/error-page';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/login-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import PrivateRoute from '../private-route/private-route';

/**
 * Main component, that is connected to index.tsx
 */

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />

        <Route
          path={AppRoute.Login}
          element = {<LoginPage/>}
        />

        <Route
          path={AppRoute.Favorites}
          element = {
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Offer}
          element = {<OfferPage />}
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
