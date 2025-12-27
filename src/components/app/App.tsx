import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/LoginPage';
import FavoritesPage from '../../pages/FavoritesPage';
import OfferPage from '../../pages/OfferPage';
import PrivateRoute from '../private-route/PrivateRoute';

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
