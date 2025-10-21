import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/LoginPage';
import FavoritesPage from '../../pages/FavoritesPage';
import OfferPage from '../../pages/OfferPage';

/**
 * Main component, that is connected to index.tsx
 */

interface AppProps {
    cardsCount: number;
}

function App({ cardsCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element = {<MainPage cardsCount={cardsCount} />}/>
        <Route path={AppRoute.Login} element = {<LoginPage/>}/>
        <Route path={AppRoute.Favorites} element = {<FavoritesPage/>}/>
        <Route path={AppRoute.Offer} element = {<OfferPage/>}/>
        <Route path="*" element = {<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
