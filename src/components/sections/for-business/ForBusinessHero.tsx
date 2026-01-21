'use client';

import heroImage from '@/assets/images/forBusinessHeroImg.png';
import { AuthModal } from '@/components/shared/AuthModal';
import Image from 'next/image';
import { useState } from 'react';

const ForBusinessHero = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <section className="relative bg-linear-to-br from-[#084f5c] via-[#0a5d6d] to-[#07c6e8] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The best booking platform to build your dream business
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                One platform to get booked, get paid, and build a loyal client
                base. Trusted by over 310,000 beauty professionals in France. Le
                Beau is the online booking system that does it all.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-[#084f5c] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Start free now
              </button>
            </div>

            {/* Right - Phone Mockup */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 scale-150 origin-center">
                <Image
                  src={heroImage}
                  alt="Beauty professional providing service to client"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative gradient blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#07c6e8]/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
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

export default ForBusinessHero;
