import React, { useState, useEffect, useRef } from 'react';
import { WaitlistModal } from './WaitlistModal';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  cta: string;
  highlight?: string;
}

export const PricingPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [visiblePlans, setVisiblePlans] = useState<Set<string>>(new Set());
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('🎯 PricingPlans component mounted at:', new Date().toISOString());
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const planId = entry.target.getAttribute('data-plan-id');
            if (planId) {
              setVisiblePlans(prev => new Set([...prev, planId]));
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

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for solo practitioners just getting started',
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      features: [
        'Up to 50 active clients',
        'Basic session notes',
        'Simple scheduling',
        'Client portal access',
        'Email support',
        'HIPAA compliance',
        'Mobile app access',
        'Basic reporting'
      ],
      limitations: [
        'No AI-powered features',
        'Limited integrations',
        'Basic templates only'
      ],
      cta: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Most popular choice for growing practices',
      monthlyPrice: 29.99,
      annualPrice: 23.99,
      popular: true,
      highlight: 'Most Popular',
      features: [
        'Up to 200 active clients',
        'AI-powered session notes',
        'Advanced scheduling with reminders',
        'Treatment planning tools',
        'Telehealth integration',
        'Insurance billing support',
        'Priority email & chat support',
        'Advanced analytics',
        'Custom templates',
        'Calendar integrations',
        'Group therapy management',
        'Outcome tracking'
      ],
      cta: 'Start Free Trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for large practices and clinics',
      monthlyPrice: 49.99,
      annualPrice: 39.99,
      features: [
        'Unlimited clients',
        'Full AI suite with custom models',
        'Multi-location support',
        'Advanced telehealth platform',
        'Complete billing automation',
        'Custom integrations & API access',
        'Dedicated account manager',
        'Phone support & training',
        'White-label options',
        'Advanced security features',
        'Custom reporting & dashboards',
        'Staff management tools',
        'Compliance monitoring',
        'Data export & migration'
      ],
      cta: 'Contact Sales'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    console.log('📋 Plan selected:', planId, 'at:', new Date().toISOString());
    if (planId === 'enterprise') {
      // In a real app, this would open a contact form or redirect to sales
      window.open('mailto:sales@theranote.pro?subject=Enterprise Plan Inquiry', '_blank');
    } else {
      setShowWaitlistModal(true);
    }
  };

  const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = visiblePlans.has(plan.id);
    const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const savings = billingCycle === 'annual' ? Math.round(((plan.monthlyPrice * 12) - (plan.annualPrice * 12)) / (plan.monthlyPrice * 12) * 100) : 0;

    useEffect(() => {
      if (cardRef.current && observerRef.current) {
        observerRef.current.observe(cardRef.current);
      }
    }, []);

    return (
      <div
        ref={cardRef}
        data-plan-id={plan.id}
        className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:scale-105 overflow-hidden`}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              {plan.highlight}
            </div>
          </div>
        )}

        <div className="p-8">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-gray-900">${currentPrice}</span>
                <span className="text-gray-500 ml-2">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
              </div>
              {billingCycle === 'annual' && savings > 0 && (
                <div className="text-green-600 text-sm font-medium mt-2">
                  Save {savings}% with annual billing
                </div>
              )}
              {billingCycle === 'annual' && (
                <div className="text-gray-500 text-sm mt-1">
                  Billed annually (${plan.annualPrice * 12}/year)
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                plan.popular
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {plan.cta}
            </button>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">What's included:</h4>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Limitations */}
            {plan.limitations && plan.limitations.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                <ul className="space-y-2">
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              All plans include our core features with HIPAA compliance, 24/7 support, and a 30-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
                <div className="flex items-center">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      billingCycle === 'monthly'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                      billingCycle === 'annual'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Annual
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                All Plans Include
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every TheraNote Pro subscription comes with these essential features to ensure your practice runs smoothly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">HIPAA Compliance</h4>
                <p className="text-gray-600 text-sm">Bank-level security and encryption</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Expert help when you need it</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Regular Updates</h4>
                <p className="text-gray-600 text-sm">New features added monthly</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Data Backup</h4>
                <p className="text-gray-600 text-sm">Automatic daily backups</p>
              </div>
            </div>
          </div>
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