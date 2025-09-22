import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface DetailedFeature {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  screenshot: string;
  comingSoon?: boolean;
}

export const FeatureGrid: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('🎯 FeatureGrid component mounted at:', new Date().toISOString());
    
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

  const features: DetailedFeature[] = [
    {
      id: 'ai-notes',
      category: 'documentation',
      icon: '🤖',
      title: 'AI-Powered Session Notes',
      description: 'Generate comprehensive, professional session notes with AI assistance while maintaining your unique therapeutic voice.',
      features: [
        'Smart note generation from session recordings',
        'Customizable templates for different therapy types',
        'Voice-to-text transcription with medical terminology',
        'SOAP note formatting and structure',
        'Progress tracking and goal monitoring',
        'Integration with treatment plans'
      ],
      screenshot: '/images/app-notes.png'
    },
    {
      id: 'client-portal',
      category: 'client-management',
      icon: '👥',
      title: 'Comprehensive Client Management',
      description: 'Manage all aspects of your client relationships with secure, HIPAA-compliant profiles and communication tools.',
      features: [
        'Detailed client profiles with demographics',
        'Secure messaging and communication',
        'Document sharing and storage',
        'Insurance and billing information',
        'Emergency contact management',
        'Client portal for self-service'
      ],
      screenshot: '/images/app-clients.png'
    },
    {
      id: 'smart-scheduling',
      category: 'scheduling',
      icon: '📅',
      title: 'Intelligent Scheduling System',
      description: 'Advanced scheduling with AI-powered conflict detection, automated reminders, and seamless calendar integration.',
      features: [
        'Drag-and-drop appointment scheduling',
        'Automated SMS and email reminders',
        'Conflict detection and resolution',
        'Recurring appointment management',
        'Waitlist and cancellation management',
        'Google Calendar and Outlook sync'
      ],
      screenshot: '/images/app-calendar.png'
    },
    {
      id: 'billing-insurance',
      category: 'billing',
      icon: '💳',
      title: 'Automated Billing & Insurance',
      description: 'Streamline your billing process with automated insurance claims, payment processing, and financial reporting.',
      features: [
        'Automated insurance claim submission',
        'Electronic payment processing',
        'Superbill generation and management',
        'Financial reporting and analytics',
        'Payment plan management',
        'Integration with major clearinghouses'
      ],
      screenshot: '/images/app-dashboard.png'
    },
    {
      id: 'telehealth',
      category: 'telehealth',
      icon: '💻',
      title: 'Integrated Telehealth Platform',
      description: 'Conduct secure video sessions with built-in HIPAA-compliant video conferencing and session recording.',
      features: [
        'HD video and audio conferencing',
        'Screen sharing and whiteboard tools',
        'Session recording and playback',
        'Waiting room and check-in process',
        'Mobile app for clients',
        'Bandwidth optimization'
      ],
      screenshot: '/images/app-sessions.png'
    },
    {
      id: 'analytics-reporting',
      category: 'analytics',
      icon: '📊',
      title: 'Advanced Practice Analytics',
      description: 'Gain insights into your practice performance with comprehensive analytics and customizable reporting.',
      features: [
        'Revenue and profitability analysis',
        'Client outcome tracking',
        'Appointment utilization metrics',
        'Custom dashboard creation',
        'Automated report generation',
        'Benchmark comparisons'
      ],
      screenshot: '/images/app-reports.png'
    },
    {
      id: 'treatment-planning',
      category: 'documentation',
      icon: '📋',
      title: 'Digital Treatment Planning',
      description: 'Create, manage, and track treatment plans with evidence-based templates and progress monitoring.',
      features: [
        'Evidence-based treatment templates',
        'Goal setting and progress tracking',
        'Outcome measurement tools',
        'Collaborative care planning',
        'Treatment plan sharing',
        'Insurance authorization support'
      ],
      screenshot: '/images/app-notes.png'
    },
    {
      id: 'group-therapy',
      category: 'scheduling',
      icon: '👫',
      title: 'Group Therapy Management',
      description: 'Efficiently manage group sessions with specialized scheduling, attendance tracking, and group dynamics tools.',
      features: [
        'Group session scheduling',
        'Attendance tracking and reporting',
        'Group dynamics assessment',
        'Shared resources and materials',
        'Group communication tools',
        'Outcome tracking for groups'
      ],
      screenshot: '/images/app-sessions.png'
    },
    {
      id: 'mobile-app',
      category: 'mobile',
      icon: '📱',
      title: 'Mobile Practice Management',
      description: 'Access your practice data securely from anywhere with our comprehensive mobile application.',
      features: [
        'Full-featured mobile app',
        'Offline note-taking capability',
        'Push notifications for appointments',
        'Secure biometric authentication',
        'Real-time data synchronization',
        'Emergency contact access'
      ],
      screenshot: '/images/app-dashboard.png'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', count: features.length },
    { id: 'documentation', name: 'Documentation', count: features.filter(f => f.category === 'documentation').length },
    { id: 'client-management', name: 'Client Management', count: features.filter(f => f.category === 'client-management').length },
    { id: 'scheduling', name: 'Scheduling', count: features.filter(f => f.category === 'scheduling').length },
    { id: 'billing', name: 'Billing', count: features.filter(f => f.category === 'billing').length },
    { id: 'telehealth', name: 'Telehealth', count: features.filter(f => f.category === 'telehealth').length },
    { id: 'analytics', name: 'Analytics', count: features.filter(f => f.category === 'analytics').length },
    { id: 'mobile', name: 'Mobile', count: features.filter(f => f.category === 'mobile').length }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const FeatureCard: React.FC<{ feature: DetailedFeature }> = ({ feature }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = visibleFeatures.has(feature.id);

    useEffect(() => {
      if (cardRef.current && observerRef.current) {
        observerRef.current.observe(cardRef.current);
      }
    }, []);

    return (
      <div
        ref={cardRef}
        data-feature-id={feature.id}
        className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } hover:scale-105 overflow-hidden ${feature.comingSoon ? 'opacity-75' : ''}`}
      >
        {/* Feature Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50">
          <Image
            src={feature.screenshot}
            alt={`${feature.title} interface screenshot`}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {feature.comingSoon && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Coming Soon
            </div>
          )}
        </div>

        {/* Feature Content */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <div className="text-sm text-gray-500 capitalize">{feature.category.replace('-', ' ')}</div>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {feature.description}
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
            <ul className="space-y-1">
              {feature.features.slice(0, 4).map((item, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
              {feature.features.length > 4 && (
                <li className="text-sm text-gray-500 ml-6">
                  +{feature.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button 
              onClick={() => {
                console.debug('Learn More clicked for feature:', feature.title);
                // Scroll to the CTA section for more information
                const ctaSection = document.querySelector('.bg-white.rounded-2xl.p-8.shadow-lg');
                if (ctaSection) {
                  ctaSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Fallback: scroll to bottom of page
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="pt-0 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Complete Feature Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of features designed to streamline every aspect of your therapy practice.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience All Features?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start your free trial today and discover how TheraNote Pro can transform your practice with these powerful features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};