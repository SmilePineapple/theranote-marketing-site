import React, { useState, useEffect, useRef } from 'react';
import { WaitlistModal } from './WaitlistModal';

interface SecurityMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
}

export const SecurityHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('🔒 SecurityHero component mounted at:', new Date().toISOString());
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Metric animation observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const metricId = entry.target.getAttribute('data-metric-id');
            if (metricId) {
              setAnimatedMetrics(prev => new Set([...prev, metricId]));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      observer.disconnect();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const securityMetrics: SecurityMetric[] = [
    {
      id: 'uptime',
      value: '99.9%',
      label: 'Uptime SLA',
      description: 'Guaranteed system availability',
      icon: 'shield-check'
    },
    {
      id: 'encryption',
      value: 'AES-256',
      label: 'Encryption',
      description: 'Military-grade data protection',
      icon: 'lock'
    },
    {
      id: 'compliance',
      value: 'SOC 2',
      label: 'Type II Certified',
      description: 'Independently audited security',
      icon: 'certificate'
    },
    {
      id: 'backup',
      value: '3x Daily',
      label: 'Backups',
      description: 'Automated data redundancy',
      icon: 'database'
    }
  ];

  const handleStartTrial = () => {
    console.log('🚀 Security page trial started at:', new Date().toISOString());
    setShowWaitlistModal(true);
  };

  const handleLearnMore = () => {
    console.log('📖 Learn more about security clicked at:', new Date().toISOString());
    // Scroll to security features section
    const featuresSection = document.getElementById('security-features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SecurityMetricCard: React.FC<{ metric: SecurityMetric; index: number }> = ({ metric, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isAnimated = animatedMetrics.has(metric.id);

    useEffect(() => {
      if (cardRef.current && observerRef.current) {
        observerRef.current.observe(cardRef.current);
      }
    }, []);

    const getIcon = (iconName: string) => {
      switch (iconName) {
        case 'shield-check':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          );
        case 'lock':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          );
        case 'certificate':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          );
        case 'database':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={cardRef}
        data-metric-id={metric.id}
        className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-700 transform ${
          isAnimated ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        } hover:bg-white/20 hover:scale-105`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {getIcon(metric.icon)}
            </svg>
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
        <div className="text-blue-200 font-semibold mb-1">{metric.label}</div>
        <div className="text-blue-300 text-sm">{metric.description}</div>
      </div>
    );
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated background shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 text-blue-200 text-sm font-medium mb-8">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              HIPAA Compliant &amp; SOC 2 Certified
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Data is
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Absolutely Secure
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              TheraNote Pro employs enterprise-grade security measures to protect your practice and client data. 
              From encryption to compliance, we've got every aspect of security covered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleStartTrial}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold text-lg rounded-full hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Start Secure Trial
              </button>
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </button>
            </div>

            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {securityMetrics.map((metric, index) => (
                <SecurityMetricCard key={metric.id} metric={metric} index={index} />
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                Trusted Security Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">HIPAA Compliant</h4>
                  <p className="text-blue-200 text-sm">
                    Full compliance with healthcare privacy regulations and signed BAAs
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">SOC 2 Type II</h4>
                  <p className="text-blue-200 text-sm">
                    Independently audited security controls and operational effectiveness
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">ISO 27001</h4>
                  <p className="text-blue-200 text-sm">
                    International standard for information security management systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal 
          isOpen={showWaitlistModal} 
          onClose={() => setShowWaitlistModal(false)} 
        />
      )}
    </>
  );
};