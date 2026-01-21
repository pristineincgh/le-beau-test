'use client';

import salonIllustration from '@/assets/images/salon-illustration.png';
import { Star, Store, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SalonSwipeCards } from './SalonSwipeCards';

const BusinessShowcase = () => {
  const router = useRouter();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            The Future of Beauty & Wellness
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the world&apos;s smartest booking platform. AI-powered
            matching for customers and intelligent growth tools for businesses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - AI Marketing Content */}
          <div className="space-y-6">
            {/* For Customers Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#07c6e8] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  For Customers
                </h3>
              </div>

              <div className="space-y-2.5">
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 hover:border-[#07c6e8]/30 hover:bg-gray-100/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 group-hover:border-[#07c6e8]/30 transition">
                      <svg
                        className="w-4 h-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5 text-sm">
                        Instant Smart Matching
                      </h4>
                      <p className="text-xs text-gray-600">
                        AI finds your perfect salon in under 2 seconds based on
                        preferences, location, and budget.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 hover:border-[#07c6e8]/30 hover:bg-gray-100/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 group-hover:border-[#07c6e8]/30 transition">
                      <Star className="w-4 h-4 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5 text-sm">
                        24/7 Instant Booking
                      </h4>
                      <p className="text-xs text-gray-600">
                        Book anytime, anywhere. No phone calls, no waiting.
                        Instant confirmation with personalized recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* For Business Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#084f5c] rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  For Business Owners
                </h3>
              </div>

              <div className="space-y-2.5">
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 hover:border-[#084f5c]/30 hover:bg-gray-100/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 group-hover:border-[#084f5c]/30 transition">
                      <TrendingUp className="w-4 h-4 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5 text-sm">
                        Revenue Optimization
                      </h4>
                      <p className="text-xs text-gray-600">
                        AI fills empty slots and suggests optimal pricing to
                        maximize earnings by up to 40%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 hover:border-[#084f5c]/30 hover:bg-gray-100/50 transition-all duration-300 group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 group-hover:border-[#084f5c]/30 transition">
                      <svg
                        className="w-4 h-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5 text-sm">
                        Smart Automation
                      </h4>
                      <p className="text-xs text-gray-600">
                        Reduce no-shows by 78% with intelligent reminders,
                        waitlists, and predictive analytics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & CTA */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => router.push('/search')}
                  className="flex-1 px-5 py-3 bg-[#07c6e8] text-white rounded-xl font-semibold hover:bg-[#06b0cf] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <span>Experience Le Beau</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => router.push('/for-business')}
                  className="flex-1 px-5 py-3 bg-[#084f5c] text-white rounded-xl font-semibold hover:bg-[#0a6270] transition-all duration-300 text-sm"
                >
                  For Businesses →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - AI Chat Interface Mockups */}
          <div className="space-y-6 lg:space-y-2 flex flex-col items-center">
            {/* Salon Illustration Background */}
            <div className="relative h-62.5 sm:h-75 lg:h-87.5 flex items-center justify-center w-full">
              <Image
                src={salonIllustration}
                alt="Beauty Salon Illustration"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Mobile AI Experience - Below image on all screen sizes */}
            <div className="w-60 sm:w-70 h-100 sm:h-120 bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-gray-800">
              <SalonSwipeCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessShowcase;
