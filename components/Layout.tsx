import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import CookieConsent from './CookieConsent';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  console.log('🏗️ Layout component rendered at:', new Date().toISOString());
  
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};