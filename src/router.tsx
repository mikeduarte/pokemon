import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import PokemonDetail from './components/PokemonDetail';
import { DefaultErrorFallback } from './components/ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/pokemon',
    element: <Home />,
    children: [{ path: ':name/:id', element: <PokemonDetail /> }],
  },
  { path: '*', element: <DefaultErrorFallback is404 /> },
]);

export default router;
