import React, { useState, useEffect, useRef } from 'react';
import { WaitlistModal } from './WaitlistModal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  practice: string;
  content: string;
  rating: number;
  avatar: string;
}

export const PricingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🎯 PricingCTA component mounted at:', new Date().toISOString());
    
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

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 'sarah-m',
      name: 'Dr. Sarah Martinez',
      role: 'Licensed Clinical Psychologist',
      practice: 'Mindful Therapy Center',
      content: 'TheraNote Pro has transformed my practice. The AI-powered notes save me 2 hours every day, and my clients love the seamless scheduling system.',
      rating: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20confident%20female%20therapist%20with%20warm%20smile%2C%20business%20attire%2C%20clean%20background&image_size=square'
    },
    {
      id: 'michael-r',
      name: 'Michael Rodriguez, LMFT',
      role: 'Marriage & Family Therapist',
      practice: 'Harmony Counseling Services',
      content: 'The HIPAA compliance and security features give me complete peace of mind. My practice has grown 40% since switching to TheraNote Pro.',
      rating: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20friendly%20male%20therapist%20with%20beard%2C%20business%20casual%2C%20office%20background&image_size=square'
    },
    {
      id: 'jennifer-k',
      name: 'Jennifer Kim, LCSW',
      role: 'Clinical Social Worker',
      practice: 'Wellness Psychology Group',
      content: 'The analytics and outcome tracking help me provide better care for my clients. The ROI has been incredible - I\'ve saved thousands in administrative costs.',
      rating: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20an%20asian%20female%20therapist%20with%20glasses%2C%20professional%20attire%2C%20modern%20office&image_size=square'
    }
  ];

  const handleStartTrial = () => {
    console.log('🚀 Start trial clicked at:', new Date().toISOString());
    setShowWaitlistModal(true);
  };

  const handleScheduleDemo = () => {
    console.log('📅 Schedule demo clicked at:', new Date().toISOString());
    // In a real app, this would open a calendar booking widget
    window.open('https://calendly.com/theranote-pro/demo', '_blank');
  };

  const handleContactSales = () => {
    console.log('💼 Contact sales clicked at:', new Date().toISOString());
    window.open('mailto:sales@theranote.pro?subject=Enterprise Plan Inquiry', '_blank');
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Main CTA */}
            <div className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Join thousands of therapists who have streamlined their practice with TheraNote Pro. 
                Start your free trial today and see the difference in just 30 days.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={handleStartTrial}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold text-lg rounded-full hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Free 30-Day Trial
                </button>
                <button
                  onClick={handleScheduleDemo}
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Schedule Live Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100 mb-12">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-8">
                Trusted by Mental Health Professionals
              </h3>
              
              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-500 ${
                      index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                      <img
                        src={testimonial.avatar}
                        alt={`${testimonial.name} headshot`}
                        className="w-20 h-20 rounded-full mb-6 border-4 border-white/20"
                        loading="lazy"
                      />
                      <blockquote className="text-xl text-white mb-6 italic">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-white">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-blue-200 text-sm">{testimonial.role}</div>
                        <div className="text-blue-300 text-sm">{testimonial.practice}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Enterprise CTA */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need an Enterprise Solution?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Large practices and healthcare organizations get custom pricing, dedicated support, 
                and advanced features tailored to your specific needs.
              </p>
              <button
                onClick={handleContactSales}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zm-6 7a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Contact Sales Team
              </button>
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