import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <h1>Loading...</h1>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {/* <AuthProvider> */}
          <PrimeReactProvider>
            <Router>{children}</Router>
          </PrimeReactProvider>
          {/* </AuthProvider> */}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
