import * as React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({children}: LayoutProps) => {
  return (
    <>
    <div className="bg-mint h-screen w-screen">
      {children}
    </div>
    </>
  );
};
