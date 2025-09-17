import { PageLayout } from '@/layout';
import { CustomErrorPage, Home } from '@/pages';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageLayout />,
    errorElement: <CustomErrorPage />,
    children: [{ path: '', element: <Home /> }],
  },
];

export default routes;
