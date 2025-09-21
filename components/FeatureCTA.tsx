import React, { useState, useEffect } from 'react';
import { WaitlistModal } from './WaitlistModal';

export const FeatureCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  useEffect(() => {
    console.log('🎯 FeatureCTA component mounted at:', new Date().toISOString());
    setIsVisible(true);
  }, []);

  const handleStartTrial = () => {
    console.log('🚀 Start trial button clicked at:', new Date().toISOString());
    setShowWaitlistModal(true);
  };

  const handleScheduleDemo = () => {
    console.log('📅 Schedule demo button clicked at:', new Date().toISOString());
    // In a real app, this would open a calendar booking widget
    window.open('https://calendly.com/theranote-pro/demo', '_blank');
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Main Heading */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Transform
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Your Practice?</span>
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Join thousands of therapists who have already streamlined their practice with TheraNote Pro's comprehensive feature suite.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">5,000+</div>
                <div className="text-blue-200 text-lg">Active Therapists</div>
                <div className="text-blue-300 text-sm mt-1">Trusted by professionals worldwide</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">40%</div>
                <div className="text-blue-200 text-lg">Time Saved</div>
                <div className="text-blue-300 text-sm mt-1">On administrative tasks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-200 text-lg">Uptime</div>
                <div className="text-blue-300 text-sm mt-1">Reliable and secure</div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">AI-Powered Notes</div>
                  <div className="text-blue-200 text-sm">Smart documentation</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🔒</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">HIPAA Compliant</div>
                  <div className="text-blue-200 text-sm">Secure & private</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📅</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Smart Scheduling</div>
                  <div className="text-blue-200 text-sm">Automated reminders</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📊</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Practice Analytics</div>
                  <div className="text-blue-200 text-sm">Insights & reports</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={handleStartTrial}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                Start Free 30-Day Trial
              </button>
              <button 
                onClick={handleScheduleDemo}
                className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-lg"
              >
                Schedule Live Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 support included</span>
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
      {showWaitlistModal && (
        <WaitlistModal 
          isOpen={showWaitlistModal} 
          onClose={() => setShowWaitlistModal(false)} 
        />
      )}
    </>
  );
};