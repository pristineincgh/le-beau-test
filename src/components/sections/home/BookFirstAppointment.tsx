import salonProfessionalsImg from '@/assets/images/salon-professionals.png';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const BookFirstAppointment: React.FC = () => {
  const benefits = [
    'Browse verified professionals near you',
    'Book instantly, anytime, anywhere',
    'Manage all appointments in one place',
    'Get instant confirmations & reminders',
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle Neutral Background */}
      <div className="absolute inset-0 bg-gray-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Book Your First Appointment Today
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Join thousands of happy customers experiencing beauty and wellness
            made simple.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10">
              <Image
                src={salonProfessionalsImg}
                alt="Book appointments easily"
                className="w-full max-w-xl mx-auto"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute top-0 sm:top-12 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-4 z-20 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#07c6e8] rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Next Available
                  </div>
                  <div className="text-xs text-gray-600">Today at 3:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Benefits & CTA */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-[#07c6e8]" />
                  </div>
                  <p className="text-base sm:text-lg text-gray-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/search">
                <button className="group w-full sm:w-auto bg-[#07c6e8] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#06b0cf] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  Find Your Perfect Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <p className="text-sm text-gray-600 text-center sm:text-left mt-3">
                No credit card required • Book in seconds
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 font-medium">
            Trusted by over 50,000+ happy customers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#084f5c]">50K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#07c6e8]">5.0</div>
              <div className="text-sm text-gray-600">App Rating</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#084f5c]">1M+</div>
              <div className="text-sm text-gray-600">Bookings Made</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
