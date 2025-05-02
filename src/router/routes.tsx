import { PageLayout } from '@/components';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageLayout />,
    children: [{ path: '/', element: null }],
  },
];

export default routes;
