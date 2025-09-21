import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3 } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    const consentDate = localStorage.getItem('cookie-consent-date');
    
    if (!consent || !consentDate) {
      // Show banner if no consent recorded
      setShowBanner(true);
    } else {
      // Check if consent is older than 1 year
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (new Date(consentDate) < oneYearAgo) {
        // Consent expired, show banner again
        setShowBanner(true);
      } else {
        // Load existing preferences and initialize GA4 if consented
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        
        if (savedPreferences.analytics) {
          initializeGA4();
        }
      }
    }

    console.debug('Cookie consent component mounted');
  }, []);

  const initializeGA4 = () => {
    // Only initialize if not already loaded
    if (typeof window !== 'undefined' && !window.gtag) {
      // Google Analytics 4 - Replace GA_MEASUREMENT_ID with your actual ID
      const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with actual GA4 ID
      
      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
      
      console.debug('GA4 initialized with consent');
    }
  };

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    
    saveConsent(newPreferences);
    initializeGA4();
    setShowBanner(false);
    
    console.debug('All cookies accepted');
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    
    saveConsent(newPreferences);
    setShowBanner(false);
    
    console.debug('Non-essential cookies rejected');
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    
    if (preferences.analytics) {
      initializeGA4();
    }
    
    setShowBanner(false);
    setShowPreferences(false);
    
    console.debug('Custom preferences saved:', preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  We use cookies
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your experience, analyze site traffic, and provide personalized content. 
                  By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or learn more in our{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowPreferences(false)} />
            
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  Customize your cookie preferences below. You can change these settings at any time.
                </p>
                
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3 flex-1">
                    <Shield className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Necessary Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Essential for the website to function properly. These cannot be disabled.
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="relative inline-block w-12 h-6 bg-green-600 rounded-full">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3 flex-1">
                    <BarChart3 className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Help us understand how visitors interact with our website by collecting anonymous information.
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('analytics')}
                      className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.analytics ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3 flex-1">
                    <Cookie className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Used to track visitors across websites to display relevant advertisements.
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('marketing')}
                      className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                        preferences.marketing ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.marketing ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default CookieConsent;