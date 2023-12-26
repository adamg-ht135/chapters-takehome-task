import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';
import MyBooks from '@/features/dashboard/author/MyBooks';
import AddBook from '@/features/dashboard/author/AddBook';
import Book from '@/features/dashboard/Book';
import Users from '@/features/dashboard/admin/Users';

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
      { path: '/', element: <Dashboard /> },
      { path: '/books', element: <Dashboard /> },
      { path: '/profile', element: <h1>Profile</h1> },
      { path: '/books/:bookId', element: <Book/> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export const authorRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/books', element: <Dashboard /> },
      { path: '/books/:bookId', element: <Book/> },
      { path: '/mybooks', element: <MyBooks/> },
      { path: '/mybooks/add-book', element: <AddBook/> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export const adminRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/books', element: <Dashboard /> },
      { path: '/books/:bookId', element: <Book/> },
      { path: '/users', element: <Users/> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];