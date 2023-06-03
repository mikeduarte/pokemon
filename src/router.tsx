import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import PokemonDetail from './components/PokemonDetail';

const router = createBrowserRouter([
  { path: '/', element: <Home />, children: [{ path: ':name/:id', element: <PokemonDetail /> }] },
]);

export default router;
