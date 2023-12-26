import { useRoutes } from 'react-router-dom';
import { protectedRoutes, authorRoutes, adminRoutes } from './protected';
import { publicRoutes } from './public';
import Home from '@/components/Home/home';

export const AppRoutes = () => {
  
  const authState = sessionStorage.getItem('auth');
  const role = sessionStorage.getItem('role');
  
  const authRoutes = (role: string | null) => {
    if (role != null){
      if (role === 'Author') {
        return authorRoutes;
      } else if (role === 'Admin') {
        return adminRoutes;
      }
      else {
        return protectedRoutes;
      }
    } else {
      return publicRoutes;
    }
  };
  
  const auth = authState === 'true';
  
  const commonRoutes = [{ path: '/', element: <Home/> }];
  const routes = auth ? authRoutes(role) : publicRoutes;


  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
