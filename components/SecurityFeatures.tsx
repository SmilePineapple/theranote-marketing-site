import React, { useState, useEffect, useRef } from 'react';

interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  category: 'encryption' | 'access' | 'compliance' | 'infrastructure';
  highlight?: boolean;
}

export const SecurityFeatures: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('🛡️ SecurityFeatures component mounted at:', new Date().toISOString());
    
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

  const securityFeatures: SecurityFeature[] = [
    {
      id: 'end-to-end-encryption',
      title: 'End-to-End Encryption',
      description: 'Military-grade AES-256 encryption protects your data at rest and in transit.',
      details: [
        'AES-256 encryption for all stored data',
        'TLS 1.3 for data transmission',
        'Encrypted database backups',
        'Client-side encryption for sensitive fields',
        'Hardware security modules (HSM) for key management'
      ],
      icon: 'lock',
      category: 'encryption',
      highlight: true
    },
    {
      id: 'access-controls',
      title: 'Advanced Access Controls',
      description: 'Multi-factor authentication and role-based permissions ensure only authorized access.',
      details: [
        'Multi-factor authentication (MFA) required',
        'Single Sign-On (SSO) integration',
        'Role-based access control (RBAC)',
        'Session timeout and management',
        'IP whitelisting and geofencing'
      ],
      icon: 'key',
      category: 'access'
    },
    {
      id: 'hipaa-compliance',
      title: 'HIPAA Compliance',
      description: 'Full compliance with healthcare privacy regulations and signed Business Associate Agreements.',
      details: [
        'Signed Business Associate Agreement (BAA)',
        'Administrative, physical, and technical safeguards',
        'Audit logs for all data access',
        'Employee training and background checks',
        'Incident response procedures'
      ],
      icon: 'shield-check',
      category: 'compliance',
      highlight: true
    },
    {
      id: 'data-backup',
      title: 'Automated Data Backup',
      description: 'Multiple daily backups with point-in-time recovery ensure your data is never lost.',
      details: [
        'Automated backups every 8 hours',
        'Point-in-time recovery up to 30 days',
        'Geographically distributed backup storage',
        'Encrypted backup transmission and storage',
        'Regular backup integrity testing'
      ],
      icon: 'database',
      category: 'infrastructure'
    },
    {
      id: 'soc2-certification',
      title: 'SOC 2 Type II Certified',
      description: 'Independently audited security controls demonstrate our commitment to data protection.',
      details: [
        'Annual SOC 2 Type II audits',
        'Security, availability, and confidentiality controls',
        'Third-party penetration testing',
        'Vulnerability assessments and remediation',
        'Continuous security monitoring'
      ],
      icon: 'certificate',
      category: 'compliance'
    },
    {
      id: 'network-security',
      title: 'Network Security',
      description: 'Advanced firewall protection and intrusion detection keep threats at bay.',
      details: [
        'Web Application Firewall (WAF)',
        'DDoS protection and mitigation',
        'Intrusion detection and prevention',
        'Network segmentation and isolation',
        '24/7 security monitoring and alerting'
      ],
      icon: 'shield',
      category: 'infrastructure'
    },
    {
      id: 'audit-logging',
      title: 'Comprehensive Audit Logs',
      description: 'Detailed logging of all system activities for compliance and security monitoring.',
      details: [
        'Complete audit trail of all user actions',
        'Tamper-proof log storage',
        'Real-time security event monitoring',
        'Automated anomaly detection',
        'Compliance reporting and analytics'
      ],
      icon: 'clipboard-list',
      category: 'compliance'
    },
    {
      id: 'secure-development',
      title: 'Secure Development',
      description: 'Security-first development practices ensure vulnerabilities are prevented, not patched.',
      details: [
        'Secure coding standards and reviews',
        'Automated security testing in CI/CD',
        'Dependency vulnerability scanning',
        'Regular security training for developers',
        'Bug bounty program for external testing'
      ],
      icon: 'code',
      category: 'infrastructure'
    },
    {
      id: 'privacy-controls',
      title: 'Privacy by Design',
      description: 'Built-in privacy controls give you and your clients complete control over personal data.',
      details: [
        'Data minimization and purpose limitation',
        'Client consent management',
        'Right to data portability and deletion',
        'Privacy impact assessments',
        'GDPR and CCPA compliance features'
      ],
      icon: 'eye-off',
      category: 'access',
      highlight: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', count: securityFeatures.length },
    { id: 'encryption', name: 'Encryption', count: securityFeatures.filter(f => f.category === 'encryption').length },
    { id: 'access', name: 'Access Control', count: securityFeatures.filter(f => f.category === 'access').length },
    { id: 'compliance', name: 'Compliance', count: securityFeatures.filter(f => f.category === 'compliance').length },
    { id: 'infrastructure', name: 'Infrastructure', count: securityFeatures.filter(f => f.category === 'infrastructure').length }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? securityFeatures 
    : securityFeatures.filter(feature => feature.category === activeCategory);

  const toggleFeature = (featureId: string) => {
    console.log('🔄 Security feature toggled:', featureId, 'at:', new Date().toISOString());
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lock':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        );
      case 'key':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        );
      case 'shield-check':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
      case 'database':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        );
      case 'certificate':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        );
      case 'shield':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
      case 'clipboard-list':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        );
      case 'code':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        );
      case 'eye-off':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        );
      default:
        return null;
    }
  };

  const SecurityFeatureCard: React.FC<{ feature: SecurityFeature; index: number }> = ({ feature, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = visibleFeatures.has(feature.id);
    const isExpanded = expandedFeature === feature.id;

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
        } ${feature.highlight ? 'ring-2 ring-blue-500' : ''} overflow-hidden`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Highlight Badge */}
        {feature.highlight && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
            ⭐ Essential Security Feature
          </div>
        )}

        <div className="p-8">
          {/* Feature Header */}
          <div className="flex items-start space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              feature.highlight ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <svg className={`w-6 h-6 ${
                feature.highlight ? 'text-blue-600' : 'text-gray-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getIcon(feature.icon)}
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>

          {/* Expand Button */}
          <button
            onClick={() => toggleFeature(feature.id)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 mb-4"
          >
            <span className="font-medium text-gray-900">
              {isExpanded ? 'Hide Details' : 'View Technical Details'}
            </span>
            <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expanded Details */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-3">
              {feature.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700 text-sm leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="security-features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Security Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every aspect of TheraNote Pro is designed with security in mind. 
            From encryption to compliance, we protect your practice and your clients.
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
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredFeatures.map((feature, index) => (
            <SecurityFeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Security Commitment */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">
            Our Security Commitment
          </h3>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
            Security isn't just a feature—it's the foundation of everything we build. 
            We continuously invest in the latest security technologies and practices to keep your data safe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2">$2M+</div>
              <div className="text-blue-100">Annual security investment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
              <div className="text-blue-100">Security monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300 mb-2">Zero</div>
              <div className="text-blue-100">Data breaches to date</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};