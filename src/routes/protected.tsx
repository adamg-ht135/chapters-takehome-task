import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <h1>Loading from protected...</h1>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <h1>Just a dashboard</h1> },
      { path: '/profile', element: <h1>Profile</h1> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
