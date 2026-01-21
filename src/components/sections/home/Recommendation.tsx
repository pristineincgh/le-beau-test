'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Business, mockBusinesses } from '@/data/mockData';
import { Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BusinessModal } from './BusinessModal';

const Recommendation = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBusinessModal = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const closeBusinessModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBusiness(null), 300);
  };

  const featuredBusinesses = mockBusinesses
    .filter((b) => b.premium)
    .slice(0, 10);

  return (
    <>
      <AnimatedSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended</h2>

          <div className="relative overflow-hidden">
            {/* Carousel Container */}
            <div className="flex gap-6 animate-scroll">
              {/* First set of cards */}
              {featuredBusinesses.map((business) => (
                <button
                  key={business.id}
                  onClick={() => openBusinessModal(business)}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all shrink-0 w-[300px] text-left"
                >
                  {/* Business Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-200">
                    <Image
                      src={business.images[0]}
                      alt={business.name}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-gray-900/90 text-white px-3 py-1 rounded-lg flex items-center space-x-1">
                      <span className="font-bold">{business.rating}</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    {/* Reviews Count */}
                    <div className="absolute top-12 right-3 bg-gray-900/90 text-white px-2 py-0.5 rounded text-xs">
                      {business.reviewCount} reviews
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#07c6e8] transition">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {business.hours}
                    </p>
                    {business.premium && (
                      <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Sponsored
                      </span>
                    )}
                  </div>
                </button>
              ))}

              {/* Duplicate set for seamless loop */}
              {featuredBusinesses.map((business) => (
                <button
                  key={`${business.id}-duplicate`}
                  onClick={() => openBusinessModal(business)}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all shrink-0 w-[300px] text-left"
                >
                  {/* Business Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-200">
                    <Image
                      src={business.images[0]}
                      alt={business.name}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-gray-900/90 text-white px-3 py-1 rounded-lg flex items-center space-x-1">
                      <span className="font-bold">{business.rating}</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    {/* Reviews Count */}
                    <div className="absolute top-12 right-3 bg-gray-900/90 text-white px-2 py-0.5 rounded text-xs">
                      {business.reviewCount} reviews
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#07c6e8] transition">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {business.hours}
                    </p>
                    {business.premium && (
                      <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Sponsored
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {isModalOpen && (
        <BusinessModal
          business={selectedBusiness}
          isOpen={isModalOpen}
          onClose={closeBusinessModal}
        />
      )}
    </>
  );
};

export default Recommendation;
