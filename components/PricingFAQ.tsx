import React, { useState, useEffect, useRef } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'features' | 'billing' | 'support';
}

export const PricingFAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('❓ PricingFAQ component mounted at:', new Date().toISOString());
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-faq-id');
            if (itemId) {
              setVisibleItems(prev => new Set([...prev, itemId]));
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

  const faqItems: FAQItem[] = [
    {
      id: 'trial-period',
      question: 'How long is the free trial?',
      answer: 'All plans come with a 30-day free trial. No credit card required to start. You can explore all features and decide which plan works best for your practice.',
      category: 'pricing'
    },
    {
      id: 'plan-changes',
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments on your next invoice.',
      category: 'billing'
    },
    {
      id: 'client-limits',
      question: 'What happens if I exceed my client limit?',
      answer: 'We\'ll notify you when you\'re approaching your limit. You can either upgrade to a higher plan or archive inactive clients. We never cut off access to your data.',
      category: 'features'
    },
    {
      id: 'data-migration',
      question: 'Can I import data from my current system?',
      answer: 'Yes! We offer free data migration assistance for all paid plans. Our team will help you import client records, notes, and appointments from most major practice management systems.',
      category: 'support'
    },
    {
      id: 'hipaa-compliance',
      question: 'Is TheraNote Pro HIPAA compliant?',
      answer: 'Absolutely. We maintain full HIPAA compliance with encrypted data storage, secure transmission, audit logs, and signed Business Associate Agreements (BAA) for all customers.',
      category: 'features'
    },
    {
      id: 'billing-cycle',
      question: 'How does annual billing work?',
      answer: 'With annual billing, you pay for 12 months upfront and save 20% compared to monthly billing. You can still change plans during the year, and we\'ll adjust your next renewal accordingly.',
      category: 'billing'
    },
    {
      id: 'cancellation',
      question: 'What\'s your cancellation policy?',
      answer: 'You can cancel anytime with no penalties. Your account remains active until the end of your current billing period. We also provide data export tools so you can take your information with you.',
      category: 'billing'
    },
    {
      id: 'ai-features',
      question: 'What AI features are included?',
      answer: 'Professional and Enterprise plans include AI-powered session note generation, treatment plan suggestions, and outcome predictions. The AI learns from your writing style to create personalized notes.',
      category: 'features'
    },
    {
      id: 'multi-location',
      question: 'Do you support multiple practice locations?',
      answer: 'Yes! The Enterprise plan includes multi-location support with centralized billing, reporting, and staff management. Each location can have its own settings and branding.',
      category: 'features'
    },
    {
      id: 'integrations',
      question: 'What integrations are available?',
      answer: 'We integrate with major EHR systems, insurance billing platforms, telehealth providers, and calendar applications. Professional plans include standard integrations, while Enterprise offers custom API access.',
      category: 'features'
    },
    {
      id: 'support-levels',
      question: 'What support do I get with each plan?',
      answer: 'Starter includes email support, Professional adds priority chat support, and Enterprise includes phone support with a dedicated account manager and training sessions.',
      category: 'support'
    },
    {
      id: 'security',
      question: 'How secure is my data?',
      answer: 'We use bank-level encryption (AES-256), secure cloud hosting, regular security audits, and maintain SOC 2 Type II compliance. Your data is backed up daily and stored in multiple secure locations.',
      category: 'features'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqItems.length },
    { id: 'pricing', name: 'Pricing', count: faqItems.filter(item => item.category === 'pricing').length },
    { id: 'features', name: 'Features', count: faqItems.filter(item => item.category === 'features').length },
    { id: 'billing', name: 'Billing', count: faqItems.filter(item => item.category === 'billing').length },
    { id: 'support', name: 'Support', count: faqItems.filter(item => item.category === 'support').length }
  ];

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (itemId: string) => {
    console.log('🔄 FAQ item toggled:', itemId, 'at:', new Date().toISOString());
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const FAQItemComponent: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const isOpen = openItems.has(item.id);
    const isVisible = visibleItems.has(item.id);

    useEffect(() => {
      if (itemRef.current && observerRef.current) {
        observerRef.current.observe(itemRef.current);
      }
    }, []);

    return (
      <div
        ref={itemRef}
        data-faq-id={item.id}
        className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } hover:shadow-md`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <button
          onClick={() => toggleItem(item.id)}
          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          aria-expanded={isOpen}
        >
          <h3 className="text-lg font-semibold text-gray-900 pr-4">
            {item.question}
          </h3>
          <div className={`flex-shrink-0 w-6 h-6 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}>
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-5">
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            <p className="text-gray-700 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our pricing, features, and support.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {filteredItems.map((item, index) => (
            <FAQItemComponent key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your practice. 
            Get in touch and we'll answer any questions you have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@theranote.pro"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a
              href="tel:+1-555-THERA-PRO"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};