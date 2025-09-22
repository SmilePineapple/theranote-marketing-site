import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';

// Cookie consent and analytics
import CookieConsent from '../components/CookieConsent';
import { Analytics } from '../components/Analytics';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Add fade-in animation to page transitions
    const handleRouteChange = () => {
      document.body.classList.add('animate-fade-in');
      setTimeout(() => {
        document.body.classList.remove('animate-fade-in');
      }, 500);
    };

    // Add scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        {/* Global meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Language and locale */}
        <meta httpEquiv="content-language" content="en-GB" />
        <meta name="language" content="English" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TheraNote Pro",
              "description": "Professional therapy practice management software designed for mental health professionals",
              "url": "https://theranotepro.com",
              "logo": "https://theranotepro.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-800-123-4567",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB",
                "addressLocality": "London"
              },
              "sameAs": [
                "https://twitter.com/theranotepro",
                "https://linkedin.com/company/theranotepro"
              ]
            })
          }}
        />
      </Head>
      
      <Component {...pageProps} />
      
      {/* Cookie consent banner */}
      <CookieConsent />
      
      {/* Analytics component */}
      <Analytics />
    </>
  );
}