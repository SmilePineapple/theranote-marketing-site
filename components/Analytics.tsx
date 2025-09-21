import React, { useEffect } from 'react';
import Script from 'next/script';

interface AnalyticsProps {
  trackingId?: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ trackingId = 'G-XXXXXXXXXX' }) => {
  useEffect(() => {
    console.log('📊 Analytics component mounted at:', new Date().toISOString());
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
};

export default Analytics;