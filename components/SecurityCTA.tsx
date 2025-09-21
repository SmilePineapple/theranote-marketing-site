import React, { useState, useEffect, useRef } from 'react';
import { WaitlistModal } from './WaitlistModal';

interface SecurityBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const SecurityCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    uptime: 0,
    practices: 0,
    dataPoints: 0,
    compliance: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🎯 SecurityCTA component mounted at:', new Date().toISOString());
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate stats when section becomes visible
          animateStats();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const targets = {
      uptime: 99.9,
      practices: 5000,
      dataPoints: 50000000,
      compliance: 100
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        uptime: Math.round(targets.uptime * easeOutQuart * 10) / 10,
        practices: Math.round(targets.practices * easeOutQuart),
        dataPoints: Math.round(targets.dataPoints * easeOutQuart),
        compliance: Math.round(targets.compliance * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);
  };

  const handleStartTrial = () => {
    console.log('🚀 Security CTA - Start Trial clicked at:', new Date().toISOString());
    setShowWaitlistModal(true);
    
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_start_trial_click', {
        event_category: 'Security CTA',
        event_label: 'Start Secure Trial',
        page_location: window.location.href
      });
    }
  };

  const handleScheduleDemo = () => {
    console.log('📅 Security CTA - Schedule Demo clicked at:', new Date().toISOString());
    
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_schedule_demo_click', {
        event_category: 'Security CTA',
        event_label: 'Schedule Security Demo',
        page_location: window.location.href
      });
    }
    
    // Redirect to scheduling page or open calendar
    window.open('https://calendly.com/theranote-pro/security-demo', '_blank');
  };

  const handleContactSecurity = () => {
    console.log('📧 Security CTA - Contact Security clicked at:', new Date().toISOString());
    
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_contact_click', {
        event_category: 'Security CTA',
        event_label: 'Contact Security Team',
        page_location: window.location.href
      });
    }
    
    window.location.href = 'mailto:security@theranotepro.com?subject=Security Inquiry';
  };

  const securityBenefits: SecurityBenefit[] = [
    {
      id: 'peace-of-mind',
      title: 'Complete Peace of Mind',
      description: 'Focus on your practice while we handle all security and compliance requirements.',
      icon: 'heart'
    },
    {
      id: 'instant-compliance',
      title: 'Instant HIPAA Compliance',
      description: 'Start with full HIPAA compliance from day one with our signed BAA.',
      icon: 'lightning-bolt'
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise-Grade Security',
      description: 'Bank-level security infrastructure protecting your most sensitive data.',
      icon: 'shield'
    },
    {
      id: 'expert-support',
      title: '24/7 Security Support',
      description: 'Our security experts are always available to address your concerns.',
      icon: 'support'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        );
      case 'lightning-bolt':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
      case 'shield':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
      case 'support':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        );
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'float 20s ease-in-out infinite'
            }}></div>
          </div>

          {/* Floating Security Icons */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 text-white opacity-5"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${10 + (i * 12)}%`,
                  animation: `float ${8 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 2}s`
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main CTA Content */}
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Practice Deserves
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Uncompromising Security
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Join thousands of healthcare professionals who trust TheraNote Pro 
              to keep their practice data secure and compliant.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleStartTrial}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Start Secure Trial</span>
              </button>
              
              <button
                onClick={handleScheduleDemo}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule Security Demo</span>
              </button>
              
              <button
                onClick={handleContactSecurity}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact Security Team</span>
              </button>
            </div>
          </div>

          {/* Security Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">
                {animatedStats.uptime}%
              </div>
              <div className="text-blue-100">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-300 mb-2">
                {formatNumber(animatedStats.practices)}
              </div>
              <div className="text-blue-100">Secure Practices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-300 mb-2">
                {formatNumber(animatedStats.dataPoints)}
              </div>
              <div className="text-blue-100">Protected Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-300 mb-2">
                {animatedStats.compliance}%
              </div>
              <div className="text-blue-100">Compliance Rate</div>
            </div>
          </div>

          {/* Security Benefits */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            {securityBenefits.map((benefit, index) => (
              <div key={benefit.id} className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {getIcon(benefit.icon)}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <p className="text-blue-200 mb-6">Trusted by healthcare professionals worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-white font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-white font-medium">SOC 2 Type II</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-white font-medium">ISO 27001 Aligned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={showWaitlistModal} 
        onClose={() => setShowWaitlistModal(false)} 
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </>
  );
};