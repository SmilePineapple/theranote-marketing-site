import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Header } from '../components/Header';
import { SecurityHero } from '../components/SecurityHero';
import { SecurityFeatures } from '../components/SecurityFeatures';
import { ComplianceSection } from '../components/ComplianceSection';
import { SecurityCTA } from '../components/SecurityCTA';
import { Footer } from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

interface SecurityPageProps {
  lastUpdated: string;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ lastUpdated }) => {
  const pageTitle = 'Security & Compliance - TheraNote Pro | HIPAA, SOC 2, ISO 27001';
  const pageDescription = 'Enterprise-grade security with HIPAA compliance, SOC 2 Type II certification, ISO 27001 standards, end-to-end encryption, and comprehensive data protection for mental health practices.';
  const canonicalUrl = 'https://www.theranotepro.com/security';
  const ogImageUrl = 'https://www.theranotepro.com/og-image-1200x630.png';

  // JSON-LD structured data for security/compliance
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TheraNote Pro',
    url: 'https://www.theranotepro.com',
    description: pageDescription,
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'HIPAA Compliance',
        description: 'Health Insurance Portability and Accountability Act compliance certification',
        credentialCategory: 'Security Certification'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'SOC 2 Type II',
        description: 'Service Organization Control 2 Type II certification for security controls',
        credentialCategory: 'Security Certification'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 27001',
        description: 'International Organization for Standardization 27001 information security management',
        credentialCategory: 'Security Certification'
      }
    ],
    securityAudit: {
      '@type': 'SecurityAudit',
      auditType: 'Penetration Testing',
      auditDate: '2024-01-01',
      auditResult: 'Passed'
    }
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TheraNote Pro',
    applicationCategory: 'HealthApplication',
    description: pageDescription,
    securityConsiderations: 'HIPAA compliant, SOC 2 Type II certified, ISO 27001 compliant, end-to-end encryption, regular security audits',
    permissions: 'Minimal data access, user-controlled permissions, audit logging',
    storageRequirements: 'Encrypted cloud storage, regular backups, data residency controls'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is TheraNote Pro HIPAA compliant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, TheraNote Pro is fully HIPAA compliant with comprehensive safeguards including end-to-end encryption, access controls, audit trails, and Business Associate Agreements (BAA) for all users.'
        }
      },
      {
        '@type': 'Question',
        name: 'What security certifications does TheraNote Pro have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TheraNote Pro maintains SOC 2 Type II certification, ISO 27001 compliance, and HIPAA compliance. We undergo regular third-party security audits and penetration testing.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is my data encrypted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit. We use industry-standard encryption protocols and regularly update our security measures.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is my data stored?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Data is stored in secure, HIPAA-compliant data centers with redundant backups. We offer data residency options and maintain strict access controls with comprehensive audit logging.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often do you perform security audits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We conduct quarterly internal security reviews, annual third-party penetration testing, and continuous vulnerability scanning. Our SOC 2 Type II audit is performed annually.'
        }
      }
    ]
  };

  console.debug('Security page rendered at:', new Date().toISOString());
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
        <meta property="og:image:alt" content="TheraNote Pro Security & Compliance" />
        <meta property="og:site_name" content="TheraNote Pro" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImageUrl} />
        <meta property="twitter:image:alt" content="TheraNote Pro Security & Compliance" />
        <meta name="twitter:creator" content="@theranotepro" />
        <meta name="twitter:site" content="@theranotepro" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#667eea" />
        <meta name="keywords" content="HIPAA compliance, SOC 2 Type II, ISO 27001, healthcare security, therapy software security, mental health data protection, encrypted therapy notes" />
        
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
                  name: 'Security',
                  item: 'https://www.theranotepro.com/security'
                }
              ]
            })
          }}
        />
        
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
          <SecurityHero />
          <SecurityFeatures />
          <ComplianceSection />
          <SecurityCTA />
        </main>
        
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<SecurityPageProps> = async () => {
  console.debug('getStaticProps called for security page at:', new Date().toISOString());
  
  return {
    props: {
      lastUpdated: new Date().toISOString()
    }
  };
};

export default SecurityPage;