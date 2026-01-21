'use client';

import {
  Calendar,
  Check,
  Clock,
  Facebook,
  Instagram,
  Link as LinkIcon,
  MapPin,
  Share2,
  Shield,
  Star,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { CustomCalendar } from './CustomCalendar';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Business, mockReviews } from '@/data/mockData';
import Image from 'next/image';
import { toast } from 'sonner';

interface BusinessModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessModal: React.FC<BusinessModalProps> = ({
  business,
  isOpen,
  onClose,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>(
    'overview'
  );
  // const { isAuthenticated, user } = useAuth();

  // // Safe navigation - only use if router context is available
  // let navigate: ReturnType<typeof useNavigate> | null = null;
  // try {
  //   navigate = useNavigate();
  // } catch (e) {
  //   // Router context not available, navigation will be disabled
  // }

  if (!isOpen || !business) return null;

  const businessReviews = mockReviews.filter(
    (r) => r.businessId === business.id
  );

  const handleWriteReview = () => {
    // if (!isAuthenticated) {
    //   alert('Please login to write a review');
    //   onClose();
    //   if (navigate) {
    //     navigate('/login', { state: { from: '/', businessId: business.id } });
    //   }
    // } else {
    //   // In a real app, this would open a review form
    //   alert('Review form would open here');
    // }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = business.services.find((s) => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = business.services.find((s) => s.id === serviceId);
      return total + (service?.duration || 0);
    }, 0);
  };

  const handleBooking = () => {
    // if (!isAuthenticated) {
    //   onClose();
    //   if (navigate) {
    //     navigate('/login', { state: { from: '/', businessId: business.id } });
    //   }
    // } else {
    //   if (navigate) {
    //     navigate('/booking-confirmation', {
    //       state: {
    //         business,
    //         services: selectedServices.map((id) =>
    //           business.services.find((s) => s.id === id)
    //         ),
    //         date: selectedDate,
    //         time: selectedTime,
    //         total: calculateTotal(),
    //       },
    //     });
    //   }
    //   onClose();
    // }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${business.name} on Le Beau!`;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
          '_blank'
        );
        break;
      case 'instagram':
        window.open(
          `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        // Fallback method for clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
          toast.error('Failed to copy link');
        }
        document.body.removeChild(textArea);
        break;
    }
    setShowShareMenu(false);
  };

  const formatDateDisplay = () => {
    if (!selectedDate) return 'Choose Date';
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-0 sm:p-4">
        <div
          className="relative bg-white rounded-none sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Static Hero Section */}
          <div className="relative h-48 sm:h-64 md:h-80 bg-gray-200 shrink-0">
            <Image
              src={business.images[0]}
              alt={business.name}
              className="w-full h-full object-cover"
              width={800}
              height={620}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

            {/* Close & Share Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
                >
                  <Share2 className="w-5 h-5 text-gray-900" />
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-12 right-0 bg-white rounded-xl shadow-2xl p-2 min-w-[180px] border border-gray-200">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-lg text-left transition"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Facebook
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-lg text-left transition"
                    >
                      <LinkIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">
                        WhatsApp
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare('instagram')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-lg text-left transition"
                    >
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Instagram
                      </span>
                    </button>
                    <div className="h-px bg-gray-200 my-1" />
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-lg text-left transition"
                    >
                      <LinkIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Copy Link
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                {business.name}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 max-w-2xl line-clamp-2">
                {business.description}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{business.rating}</span>
                  <span className="text-white/80">
                    ({businessReviews.length} reviews)
                  </span>
                </div>
                {business.verified && (
                  <div className="flex items-center gap-1.5 bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">
                      Location
                    </div>
                    <div className="text-gray-600 text-sm">
                      {business.address}, {business.city}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#07c6e8]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#07c6e8]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">
                      Hours
                    </div>
                    <div className="text-gray-600 text-sm">
                      {business.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-4 sm:gap-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`
                      pb-4 text-sm font-semibold transition-all relative
                      ${
                        activeTab === 'overview'
                          ? 'text-[#07c6e8]'
                          : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    Overview
                    {activeTab === 'overview' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07c6e8]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`
                      pb-4 text-sm font-semibold transition-all relative
                      ${
                        activeTab === 'reviews'
                          ? 'text-[#07c6e8]'
                          : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    Reviews ({businessReviews.length})
                    {activeTab === 'reviews' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07c6e8]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' ? (
                <>
                  {/* Services Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Select Services
                    </h3>
                    <div className="space-y-3">
                      {business.services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`
                            border-2 rounded-xl p-4 cursor-pointer transition-all
                            ${
                              selectedServices.includes(service.id)
                                ? 'border-[#07c6e8] bg-[#07c6e8]/5'
                                : 'border-gray-200 hover:border-[#07c6e8]/50'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-gray-900">
                                  {service.name}
                                </h4>
                                {selectedServices.includes(service.id) && (
                                  <div className="w-5 h-5 bg-[#07c6e8] rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {service.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-600">
                                  <Clock className="w-4 h-4 inline mr-1" />
                                  {service.duration} min
                                </span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-2xl font-bold text-[#07c6e8]">
                                €{service.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time Selection */}
                  {selectedServices.length > 0 && (
                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Select Date & Time
                      </h3>

                      {!showCalendar ? (
                        <button
                          onClick={() => setShowCalendar(true)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#07c6e8]/50 transition text-left flex items-center justify-between group"
                        >
                          <span
                            className={
                              selectedDate
                                ? 'text-gray-900 font-medium'
                                : 'text-gray-500'
                            }
                          >
                            {formatDateDisplay()}
                          </span>
                          <Calendar className="w-5 h-5 text-gray-400 group-hover:text-[#07c6e8] transition" />
                        </button>
                      ) : (
                        <div>
                          <CustomCalendar
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                            // selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                            minDate={new Date()}
                          />
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => setShowCalendar(false)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setShowCalendar(false)}
                              disabled={!selectedDate || !selectedTime}
                              className={`
                                flex-1 px-4 py-2 rounded-lg font-medium transition
                                ${
                                  selectedDate && selectedTime
                                    ? 'bg-[#07c6e8] text-white hover:bg-[#06b0cf]'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }
                              `}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Booking Summary & CTA */}
                  {selectedServices.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Booking Summary
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Services Selected
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedServices.length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Duration</span>
                          <span className="font-semibold text-gray-900">
                            {calculateDuration()} min
                          </span>
                        </div>
                        {selectedDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Date</span>
                            <span className="font-semibold text-gray-900">
                              {formatDateDisplay()}
                            </span>
                          </div>
                        )}
                        {selectedTime && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Time</span>
                            <span className="font-semibold text-gray-900">
                              {selectedTime}
                            </span>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200 mt-3">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">
                              Total Price
                            </span>
                            <span className="text-2xl font-bold text-[#07c6e8]">
                              €{calculateTotal()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime}
                        className={`
                          w-full py-4 rounded-xl font-bold text-lg transition-all
                          ${
                            selectedDate && selectedTime
                              ? 'bg-[#07c6e8] text-white hover:bg-[#06b0cf] hover:shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        {/* {!isAuthenticated ? 'Login to Book' : 'Book Service'} */}
                        Book Service
                      </button>

                      {/* {!isAuthenticated && (
                        <p className="text-xs text-gray-500 text-center mt-3">
                          You'll be redirected to login to complete your booking
                        </p>
                      )} */}
                    </div>
                  )}

                  {selectedServices.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">
                        Select services to continue with booking
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Reviews Tab */}
                  <div className="mb-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        Customer Reviews
                      </h3>
                    </div>

                    {businessReviews.length > 0 ? (
                      <div className="space-y-6">
                        {businessReviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 pb-6 last:border-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#07c6e8] shrink-0 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {review.userName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-bold text-gray-900">
                                        {review.userName}
                                      </span>
                                      {review.verified && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded text-xs text-green-700 font-medium">
                                          <Shield className="w-3 h-3" />
                                          Verified
                                        </div>
                                      )}
                                    </div>
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString(
                                      'en-US',
                                      {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                      }
                                    )}
                                  </span>
                                </div>
                                {review.serviceName && (
                                  <div className="text-xs text-gray-500 mb-2">
                                    Service: {review.serviceName}
                                  </div>
                                )}
                                <p className="text-gray-700 leading-relaxed mb-3">
                                  {review.comment}
                                </p>
                                {review.response && (
                                  <div className="bg-gray-50 rounded-lg p-4 mt-3 border-l-4 border-[#07c6e8]">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-semibold text-sm text-gray-900">
                                        Response from {business.name}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                      {review.response}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Star className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No reviews yet.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
