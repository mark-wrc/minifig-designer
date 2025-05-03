import { PageLayout } from '@/components';
import Home from '@/pages/Home';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageLayout />,
    children: [{ path: '', element: <Home /> }],
  },
];

export default routes;
