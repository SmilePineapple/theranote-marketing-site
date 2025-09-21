import React, { useState, useEffect, useRef } from 'react';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'certified' | 'compliant' | 'verified';
  details: string[];
  icon: string;
  badge?: string;
  auditDate?: string;
}

export const ComplianceSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<string>('certifications');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log('📋 ComplianceSection component mounted at:', new Date().toISOString());
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-compliance-id');
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

  const certifications: ComplianceItem[] = [
    {
      id: 'hipaa',
      title: 'HIPAA Compliance',
      description: 'Full compliance with Health Insurance Portability and Accountability Act requirements.',
      status: 'certified',
      badge: 'BAA Available',
      auditDate: '2024',
      details: [
        'Signed Business Associate Agreement (BAA) provided',
        'Administrative safeguards implemented',
        'Physical safeguards for data centers',
        'Technical safeguards for electronic PHI',
        'Regular risk assessments and mitigation',
        'Employee training and access controls',
        'Incident response and breach notification procedures'
      ],
      icon: 'shield-check'
    },
    {
      id: 'soc2',
      title: 'SOC 2 Type II',
      description: 'Independently audited security, availability, and confidentiality controls.',
      status: 'certified',
      badge: 'Annual Audit',
      auditDate: '2024',
      details: [
        'Security controls for data protection',
        'Availability controls for system uptime',
        'Confidentiality controls for sensitive data',
        'Processing integrity for accurate operations',
        'Privacy controls for personal information',
        'Third-party audit by certified CPA firm',
        'Continuous monitoring and improvement'
      ],
      icon: 'certificate'
    },
    {
      id: 'iso27001',
      title: 'ISO 27001',
      description: 'International standard for information security management systems.',
      status: 'compliant',
      badge: 'Framework Aligned',
      details: [
        'Information security management system (ISMS)',
        'Risk assessment and treatment processes',
        'Security policies and procedures',
        'Asset management and classification',
        'Access control and identity management',
        'Cryptography and key management',
        'Incident management and business continuity'
      ],
      icon: 'globe'
    }
  ];

  const regulations: ComplianceItem[] = [
    {
      id: 'gdpr',
      title: 'GDPR Compliance',
      description: 'General Data Protection Regulation compliance for EU data subjects.',
      status: 'compliant',
      details: [
        'Lawful basis for data processing',
        'Data subject rights implementation',
        'Privacy by design and by default',
        'Data protection impact assessments',
        'Data breach notification procedures',
        'Data portability and deletion capabilities',
        'Privacy policy transparency'
      ],
      icon: 'user-shield'
    },
    {
      id: 'ccpa',
      title: 'CCPA Compliance',
      description: 'California Consumer Privacy Act compliance for California residents.',
      status: 'compliant',
      details: [
        'Consumer right to know about data collection',
        'Right to delete personal information',
        'Right to opt-out of data sales',
        'Non-discrimination for privacy rights exercise',
        'Privacy policy disclosures',
        'Verifiable consumer request processes',
        'Third-party data sharing transparency'
      ],
      icon: 'scale'
    },
    {
      id: 'pipeda',
      title: 'PIPEDA Compliance',
      description: 'Personal Information Protection and Electronic Documents Act compliance for Canada.',
      status: 'compliant',
      details: [
        'Consent for collection, use, and disclosure',
        'Limiting collection to necessary purposes',
        'Accuracy and safeguarding of personal information',
        'Openness about privacy practices',
        'Individual access to personal information',
        'Challenging compliance procedures',
        'Accountability for privacy protection'
      ],
      icon: 'maple-leaf'
    }
  ];

  const audits: ComplianceItem[] = [
    {
      id: 'penetration-testing',
      title: 'Penetration Testing',
      description: 'Regular third-party security assessments to identify vulnerabilities.',
      status: 'verified',
      badge: 'Quarterly',
      details: [
        'External penetration testing by certified firms',
        'Web application security assessments',
        'Network infrastructure testing',
        'Social engineering assessments',
        'Vulnerability remediation tracking',
        'Executive summary reports provided',
        'Continuous improvement recommendations'
      ],
      icon: 'search'
    },
    {
      id: 'vulnerability-scanning',
      title: 'Vulnerability Scanning',
      description: 'Automated and manual vulnerability assessments across all systems.',
      status: 'verified',
      badge: 'Continuous',
      details: [
        'Automated vulnerability scanning tools',
        'Manual security code reviews',
        'Dependency vulnerability monitoring',
        'Infrastructure security assessments',
        'Real-time threat intelligence integration',
        'Risk-based remediation prioritization',
        'Compliance gap analysis'
      ],
      icon: 'bug'
    },
    {
      id: 'security-audit',
      title: 'Security Audits',
      description: 'Comprehensive security audits by independent security firms.',
      status: 'verified',
      badge: 'Annual',
      auditDate: '2024',
      details: [
        'Independent security firm assessments',
        'Policy and procedure reviews',
        'Technical control evaluations',
        'Employee security awareness testing',
        'Physical security assessments',
        'Incident response plan testing',
        'Remediation plan development'
      ],
      icon: 'clipboard-check'
    }
  ];

  const tabs = [
    { id: 'certifications', name: 'Certifications', items: certifications },
    { id: 'regulations', name: 'Regulations', items: regulations },
    { id: 'audits', name: 'Audits & Testing', items: audits }
  ];

  const activeItems = tabs.find(tab => tab.id === activeTab)?.items || [];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield-check':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
      case 'certificate':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        );
      case 'globe':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        );
      case 'user-shield':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        );
      case 'scale':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        );
      case 'maple-leaf':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" />
        );
      case 'search':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        );
      case 'bug':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0l-3-3m3 3l-3 3" />
        );
      case 'clipboard-check':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'certified':
        return 'text-green-600 bg-green-100';
      case 'compliant':
        return 'text-blue-600 bg-blue-100';
      case 'verified':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const ComplianceCard: React.FC<{ item: ComplianceItem; index: number }> = ({ item, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = visibleItems.has(item.id);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      if (cardRef.current && observerRef.current) {
        observerRef.current.observe(cardRef.current);
      }
    }, []);

    const toggleExpanded = () => {
      console.log('🔄 Compliance item toggled:', item.id, 'at:', new Date().toISOString());
      setIsExpanded(!isExpanded);
    };

    return (
      <div
        ref={cardRef}
        data-compliance-id={item.id}
        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } overflow-hidden`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {getIcon(item.icon)}
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                getStatusColor(item.status)
              }`}>
                {item.status}
              </span>
              {item.badge && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                  {item.badge}
                </span>
              )}
              {item.auditDate && (
                <span className="text-xs text-gray-500">
                  Audited {item.auditDate}
                </span>
              )}
            </div>
          </div>

          {/* Expand Button */}
          <button
            onClick={toggleExpanded}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 mb-4"
          >
            <span className="font-medium text-gray-900">
              {isExpanded ? 'Hide Details' : 'View Compliance Details'}
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
              {item.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
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
    <section id="compliance" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Regulatory Compliance & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of compliance and undergo regular audits 
            to ensure your practice meets all regulatory requirements.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 mx-2 mb-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Compliance Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {activeItems.map((item, index) => (
            <ComplianceCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to compliance and security has earned the trust of thousands of healthcare providers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">HIPAA Compliant</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">SOC 2</div>
              <div className="text-gray-600">Type II Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Compliance Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">Zero</div>
              <div className="text-gray-600">Compliance Violations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};