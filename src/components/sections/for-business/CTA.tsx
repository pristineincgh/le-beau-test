'use client';

import { AuthModal } from '@/components/shared/AuthModal';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { useState } from 'react';

const CTA = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      {/* Pricing CTA Section */}
      <section className="py-20 md:py-28 bg-linear-to-br from-[#084f5c] to-[#0a5d6d] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#07c6e8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#07c6e8]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on left */}
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763048208932-cbe149724374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMHdvcmt8ZW58MXx8fHwxNzY4MDg2MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Beauty professional at work"
                className="w-full h-auto rounded-2xl shadow-2xl"
                width={1080}
                height={720}
              />
            </div>

            {/* Pricing on right */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Every feature included
              </h2>
              <div className="my-8">
                <div className="text-6xl md:text-7xl font-bold mb-2">€40</div>
                <div className="text-xl opacity-90">per month</div>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-[#084f5c] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg mb-6 cursor-pointer"
              >
                Start free now
              </button>
              <div className="text-sm opacity-90 space-y-1">
                <p>✓ 14-day free trial</p>
                <p>✓ No credit card required</p>
                <p>✓ Cancel anytime</p>
                <p>✓ Full access to all features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join 1,000+ beauty businesses on Le Beau
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start attracting more clients and growing your business today
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-[#07c6e8] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#06b0cf] transition cursor-pointer"
          >
            Get Started Free
          </button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialView="signup"
          initialAccountType="provider"
        />
      )}
    </>
  );
};

export default CTA;
