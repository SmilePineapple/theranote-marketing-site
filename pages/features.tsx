import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Header } from '../components/Header';
import { FeatureHero } from '../components/FeatureHero';
import { FeatureGrid } from '../components/FeatureGrid';
import { FeatureCTA } from '../components/FeatureCTA';
import { Footer } from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

interface FeaturesPageProps {
  lastUpdated: string;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ lastUpdated }) => {
  const pageTitle = 'Features - TheraNote Pro | AI-Powered Practice Management';
  const pageDescription = 'Discover powerful features including AI session notes, smart scheduling, HIPAA compliance, practice analytics, and mobile access for mental health professionals.';
  const canonicalUrl = 'https://www.theranotepro.com/features';
  const ogImageUrl = 'https://www.theranotepro.com/og-image-1200x630.png';

  // JSON-LD structured data for features
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TheraNote Pro',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: pageDescription,
    url: 'https://www.theranotepro.com',
    featureList: [
      'AI-Powered Session Notes',
      'Smart Scheduling System',
      'HIPAA Compliance Tools',
      'Practice Analytics Dashboard',
      'Mobile Access',
      'Client Management System',
      'Automated Billing',
      'Secure Communication',
      'Treatment Planning'
    ],
    screenshot: ogImageUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free Trial Available'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What AI features does TheraNote Pro offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TheraNote Pro offers AI-powered session note generation, intelligent scheduling suggestions, automated treatment plan recommendations, and smart analytics insights to help streamline your practice.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is TheraNote Pro HIPAA compliant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, TheraNote Pro is fully HIPAA compliant with end-to-end encryption, secure data storage, audit trails, and comprehensive security measures to protect patient information.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I access TheraNote Pro on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, TheraNote Pro is fully responsive and optimized for mobile devices, allowing you to manage your practice, take notes, and access client information on the go.'
        }
      }
    ]
  };

  console.debug('Features page rendered at:', new Date().toISOString());
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
        <meta property="og:image:alt" content="TheraNote Pro Features - AI-Powered Practice Management" />
        <meta property="og:site_name" content="TheraNote Pro" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImageUrl} />
        <meta property="twitter:image:alt" content="TheraNote Pro Features - AI-Powered Practice Management" />
        <meta name="twitter:creator" content="@theranotepro" />
        <meta name="twitter:site" content="@theranotepro" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="keywords" content="therapy software, practice management, AI session notes, HIPAA compliance, mental health software, therapy features" />
        
        {/* Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.theranotepro.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Features',
                  item: 'https://www.theranotepro.com/features'
                }
              ]
            })
          }}
        />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          <FeatureHero />
          <FeatureGrid />
          <FeatureCTA />
        </main>
        
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<FeaturesPageProps> = async () => {
  console.debug('getStaticProps called for features page at:', new Date().toISOString());
  
  return {
    props: {
      lastUpdated: new Date().toISOString()
    }
  };
};

export default FeaturesPage;