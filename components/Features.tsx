import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  screenshot?: string;
}

export const Features: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('🎯 Features component mounted at:', new Date().toISOString());
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const featureId = entry.target.getAttribute('data-feature-id');
            if (featureId) {
              setVisibleFeatures(prev => new Set([...prev, featureId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const features: Feature[] = [
    {
      id: 'client-management',
      icon: '👥',
      title: 'Client Management',
      description: 'Comprehensive client profiles with secure data storage and easy access to session history.',
      benefits: [
        'Secure client profiles with HIPAA compliance',
        'Session history and progress tracking',
        'Appointment scheduling integration',
        'Contact information management'
      ],
      screenshot: '/images/feature-icon.png'
    },
    {
      id: 'session-notes',
      icon: '📝',
      title: 'AI-Powered Session Notes',
      description: 'Generate comprehensive session notes with AI assistance while maintaining your professional voice.',
      benefits: [
        'AI-assisted note generation',
        'Customizable templates',
        'Voice-to-text transcription',
        'Professional formatting'
      ],
      screenshot: '/images/feature-icon.png'
    },
    {
      id: 'calendar',
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Intelligent calendar management with automated reminders and conflict detection.',
      benefits: [
        'Automated appointment reminders',
        'Conflict detection and resolution',
        'Client self-scheduling portal',
        'Calendar integration (Google, Outlook)'
      ],
      screenshot: '/images/feature-icon.png'
    },
    {
      id: 'analytics',
      icon: '📊',
      title: 'Practice Analytics',
      description: 'Comprehensive insights into your practice performance and client outcomes.',
      benefits: [
        'Revenue and billing analytics',
        'Client progress tracking',
        'Appointment utilization metrics',
        'Custom reporting dashboards'
      ],
      screenshot: '/images/feature-icon.png'
    },
    {
      id: 'hipaa-compliance',
      icon: '🔒',
      title: 'HIPAA Compliance',
      description: 'Built-in HIPAA compliance with end-to-end encryption and audit trails.',
      benefits: [
        '256-bit end-to-end encryption',
        'Comprehensive audit trails',
        'Secure data backup and recovery',
        'Compliance reporting tools'
      ],
      screenshot: '/images/security-badge.png'
    },
    {
      id: 'mobile-access',
      icon: '📱',
      title: 'Mobile Access',
      description: 'Access your practice data securely from anywhere with our mobile-optimized platform.',
      benefits: [
        'Responsive web application',
        'Offline note-taking capability',
        'Secure mobile authentication',
        'Real-time synchronization'
      ],
      screenshot: '/images/feature-icon.png'
    },
  ];

  const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = visibleFeatures.has(feature.id);
    const isEven = index % 2 === 0;

    useEffect(() => {
      if (cardRef.current && observerRef.current) {
        observerRef.current.observe(cardRef.current);
      }
    }, []);

    return (
      <div
        ref={cardRef}
        data-feature-id={feature.id}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${isEven ? 'lg:grid-flow-row' : 'lg:grid-flow-row-dense'}`}
      >
        {/* Content */}
        <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              {feature.icon}
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {feature.title}
            </h3>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {feature.description}
          </p>
          
          <ul className="space-y-3">
            {feature.benefits.map((benefit, benefitIndex) => (
              <li key={benefitIndex} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Screenshot */}
        <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 shadow-2xl">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="aspect-video relative">
                <Image
                  src={feature.screenshot || '/placeholder-feature.png'}
                  alt={`${feature.title} interface screenshot`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Streamline Your Practice</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TheraNote Pro combines powerful features with intuitive design to help you focus on what matters most—your clients.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Practice?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of therapists who are already saving time and improving client care with TheraNote Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};