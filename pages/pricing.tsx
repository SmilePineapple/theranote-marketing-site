import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Header } from '../components/Header';
import { PricingHero } from '../components/PricingHero';
import { PricingPlans } from '../components/PricingPlans';
import { PricingFAQ } from '../components/PricingFAQ';
import { PricingCTA } from '../components/PricingCTA';
import { Footer } from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

interface PricingPageProps {
  lastUpdated: string;
}

const PricingPage: React.FC<PricingPageProps> = ({ lastUpdated }) => {
  const pageTitle = 'Pricing - TheraNote Pro | Affordable Practice Management Plans';
  const pageDescription = 'Choose the perfect plan for your therapy practice. Start with our free trial, then upgrade to Starter ($29/month), Professional ($79/month), or Enterprise plans.';
  const canonicalUrl = 'https://www.theranotepro.com/pricing';
  const ogImageUrl = 'https://www.theranotepro.com/og-image-1200x630.png';

  // JSON-LD structured data for pricing/products
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TheraNote Pro',
    description: pageDescription,
    brand: {
      '@type': 'Brand',
      name: 'TheraNote Pro'
    },
    category: 'Software',
    image: ogImageUrl,
    url: 'https://www.theranotepro.com',
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter Plan',
        description: 'Perfect for solo practitioners starting their practice',
        price: '9.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '9.99',
          priceCurrency: 'USD',
          unitText: 'MONTH'
        },
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        seller: {
          '@type': 'Organization',
          name: 'TheraNote Pro'
        }
      },
      {
        '@type': 'Offer',
        name: 'Professional Plan',
        description: 'Ideal for growing practices with advanced features',
        price: '29.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '29.99',
          priceCurrency: 'USD',
          unitText: 'MONTH'
        },
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        seller: {
          '@type': 'Organization',
          name: 'TheraNote Pro'
        }
      },
      {
        '@type': 'Offer',
        name: 'Enterprise Plan',
        description: 'Custom solutions for large practices and organizations',
        price: '49.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '49.99',
          priceCurrency: 'USD',
          unitText: 'MONTH'
        },
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        seller: {
          '@type': 'Organization',
          name: 'TheraNote Pro'
        }
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is there a free trial available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I change my plan at any time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly.'
        }
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and ACH bank transfers for annual plans.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there a setup fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, there are no setup fees or hidden costs. You only pay the monthly or annual subscription fee for your chosen plan.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer discounts for annual billing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Save 20% when you choose annual billing. For example, the Professional plan is $79/month or $758/year (equivalent to $63/month).'
        }
      },
      {
        '@type': 'Question',
        name: 'What happens if I exceed my plan limits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We\'ll notify you before you reach your limits and help you upgrade to a suitable plan. We never charge overage fees without prior approval.'
        }
      }
    ]
  };

  console.debug('Pricing page rendered at:', new Date().toISOString());
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
        <meta property="og:image:alt" content="TheraNote Pro Pricing Plans" />
        <meta property="og:site_name" content="TheraNote Pro" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImageUrl} />
        <meta property="twitter:image:alt" content="TheraNote Pro Pricing Plans" />
        <meta name="twitter:creator" content="@theranotepro" />
        <meta name="twitter:site" content="@theranotepro" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="keywords" content="therapy software pricing, practice management cost, HIPAA software plans, mental health software pricing, therapy practice subscription" />
        
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
                  name: 'Pricing',
                  item: 'https://www.theranotepro.com/pricing'
                }
              ]
            })
          }}
        />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema)
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
          <PricingHero />
          <PricingPlans />
          <PricingFAQ />
          <PricingCTA />
        </main>
        
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<PricingPageProps> = async () => {
  console.debug('getStaticProps called for pricing page at:', new Date().toISOString());
  
  return {
    props: {
      lastUpdated: new Date().toISOString()
    },

  };
};

export default PricingPage;