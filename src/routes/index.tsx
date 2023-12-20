import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import Home from '@/components/Home/home';

export const AppRoutes = () => {
  const auth = false;

  const commonRoutes = [{ path: '/', element: <Home/> }];

  const routes = auth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
