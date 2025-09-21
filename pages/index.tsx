import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

interface HomePageProps {
  lastUpdated: string;
}

const HomePage: React.FC<HomePageProps> = ({ lastUpdated }) => {
  const pageTitle = 'TheraNote Pro - HIPAA-Compliant Practice Management Software';
  const pageDescription = 'Streamline your therapy practice with AI-powered session notes, smart scheduling, and complete HIPAA compliance. Start your free trial today.';
  const canonicalUrl = 'https://www.theranotepro.com';
  const ogImageUrl = 'https://www.theranotepro.com/og-image-1200x630.png';

  // JSON-LD structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TheraNote Pro',
    url: 'https://www.theranotepro.com',
    logo: 'https://www.theranotepro.com/og-image-1200x630.png',
    description: pageDescription,
    foundingDate: '2024',
    industry: 'Healthcare Technology',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@theranotepro.com'
    },
    sameAs: [
      'https://twitter.com/theranotepro',
      'https://linkedin.com/company/theranotepro'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TheraNote Pro',
    url: 'https://www.theranotepro.com',
    description: pageDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.theranotepro.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TheraNote Pro',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: pageDescription,
    url: 'https://www.theranotepro.com',
    screenshot: ogImageUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free Trial Available'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127'
    }
  };

  console.debug('Homepage rendered at:', new Date().toISOString());
  console.debug('Last updated:', lastUpdated);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="TheraNote Pro" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TheraNote Pro - HIPAA-Compliant Practice Management" />
        <meta property="og:site_name" content="TheraNote Pro" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImageUrl} />
        <meta property="twitter:image:alt" content="TheraNote Pro - HIPAA-Compliant Practice Management" />
        <meta name="twitter:creator" content="@theranotepro" />
        <meta name="twitter:site" content="@theranotepro" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TheraNote Pro" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema)
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          <Hero />
          <Features />
        </main>
        
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.debug('getStaticProps called for homepage at:', new Date().toISOString());
  
  return {
    props: {
      lastUpdated: new Date().toISOString()
    },

  };
};

export default HomePage;