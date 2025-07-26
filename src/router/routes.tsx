import { PageLayout } from '@/layout';
import CustomErrorPage from '@/pages/CustomErrorPage';
import Home from '@/pages/Home';
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
