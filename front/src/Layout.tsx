import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
