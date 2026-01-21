'use client';

import bookingIllustration from '@/assets/images/booking-illustration.png';
import businessSalonIllustration from '@/assets/images/business-salon-illustration.png';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const AppDownloadSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Find & Book An Appointment Card */}
          <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="p-8 sm:p-10 relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#07c6e8] text-white rounded-lg text-sm mb-6">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">
                  Le Beau App • iOS, Android • Join the waiting list
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Find & Book An Appointment
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-6">
                Cut the phone tag. Find your next appointment and{' '}
                <strong>book instantly</strong> anytime, anywhere.
              </p>

              {/* Input Form */}
              <div className="flex flex-col lg:flex-row gap-3 mb-8">
                <Select>
                  <SelectTrigger className="w-full lg:w-24 px-4 py-6 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#07c6e8]">
                    <SelectValue placeholder="+33" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+33">+33</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+49">+49</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  className="flex-1 px-4 py-4 lg:py-6 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07c6e8]"
                />
                <button className="px-6 py-3 bg-[#07c6e8] text-white rounded-lg hover:bg-[#06b0cf] transition font-semibold whitespace-nowrap">
                  Join Today
                </button>
              </div>

              {/* Vector Illustration */}
              <div className="relative mt-8">
                {/* Booking Illustration */}
                <div className="relative flex items-center justify-center">
                  <Image
                    src={bookingIllustration}
                    alt="Book appointments easily"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Le Beau For Your Business Card */}
          <div className="bg-linear-to-br from-gray-50 to-cyan-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="p-8 sm:p-10 relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#084f5c] text-white rounded-lg text-sm mb-6">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">
                  Le Beau App • iOS, Android • Join the waiting list
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Le Beau For Your Business
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-6">
                Get started with Le Beau to run your business,{' '}
                <strong>better</strong>. Calendar, Booking, Marketing, and
                Payments all in one.
              </p>

              {/* CTA Button */}
              <Link href="/for-business">
                <button className="px-6 py-3 bg-[#084f5c] text-white rounded-lg hover:bg-[#0a6270] transition font-semibold mb-8">
                  Grow My Business
                </button>
              </Link>

              {/* Vector Illustration */}
              <div className="relative mt-4">
                {/* Business Illustration */}
                <div className="flex items-center justify-center">
                  <Image
                    src={businessSalonIllustration}
                    alt="Salon business management"
                    className="w-full mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
