'use client';

import lightLogo from '@/assets/logo/light-logo.svg';
import { DateTimePicker } from '@/components/shared/DateTimePicker';
import { TypewriterEffect } from '@/components/shared/TypeWriterEffect';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { typewriterMessagesEn, typewriterMessagesFr } from '@/lib/constants';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BookingCounter } from './BookingCounter';

export function Hero() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search filter states
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectedCity, setDetectedCity] = useState('');
  const [locationErrorModal, setLocationErrorModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: '' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query params based on selected filters
    const params = new URLSearchParams();

    if (selectedService) {
      params.append('category', selectedService);
    }

    if (selectedLocation) {
      params.append('location', selectedLocation);
    }

    if (selectedDateTime) {
      params.append('datetime', selectedDateTime);
    }

    // Navigate to search page with filters
    router.push(`/search?${params.toString()}`);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // In a real app, you would use reverse geocoding API to get the city
        // For demo purposes, we'll simulate finding the nearest city
        const cities = [
          { name: 'Paris', lat: 48.8566, lon: 2.3522 },
          { name: 'Lyon', lat: 45.764, lon: 4.8357 },
          { name: 'Marseille', lat: 43.2965, lon: 5.3698 },
          { name: 'Nice', lat: 43.7102, lon: 7.262 },
          { name: 'Cannes', lat: 43.5528, lon: 7.0174 },
          { name: 'Toulouse', lat: 43.6047, lon: 1.4442 },
          { name: 'Bordeaux', lat: 44.8378, lon: -0.5792 },
          { name: 'Lille', lat: 50.6292, lon: 3.0573 },
          { name: 'Strasbourg', lat: 48.5734, lon: 7.7521 },
          { name: 'Nantes', lat: 47.2184, lon: -1.5536 },
        ];

        // Find nearest city (simple distance calculation)
        let nearestCity = cities[0];
        let minDistance = Infinity;

        cities.forEach((city) => {
          const distance = Math.sqrt(
            Math.pow(latitude - city.lat, 2) + Math.pow(longitude - city.lon, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
          }
        });

        setDetectedCity(nearestCity.name);
        setSelectedLocation(nearestCity.name);
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsDetectingLocation(false);

        // Provide specific error messages based on error code
        let errorMessage = 'Unable to retrieve your location. ';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage +=
              'Location permission was denied. Please enable location access in your browser settings or select a city manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage +=
              'Location information is unavailable. Please select a city manually.';
            break;
          case error.TIMEOUT:
            errorMessage +=
              'Location request timed out. Please try again or select a city manually.';
            break;
          default:
            errorMessage += 'Please select a city manually.';
            break;
        }

        setLocationErrorModal({ isOpen: true, message: errorMessage });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <section className="relative min-h-[700px] md:min-h-[750px] lg:min-h-[800px] overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
            type="video/webm"
          />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content Overlay */}
      <div className="relative flex flex-col items-center justify-center text-white px-4 z-10 py-16 md:py-20 min-h-[700px] md:min-h-[750px] lg:min-h-[600px]">
        {/* Logo */}
        <div className="mb-8 md:mb-10">
          <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 w-80">
            <Image
              src={lightLogo}
              alt="Le Beau Logo"
              fill
              className="object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>
        </div>

        {/* Typewriter Animation */}
        <div className="mb-4 md:mb-6 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[90px] flex items-center justify-center">
          <TypewriterEffect messages={typewriterMessagesFr} />
        </div>

        {/* Static Hero Text */}
        <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white text-center px-4">
          Discover and book beauty & wellness professionals near you
        </p>

        {/* Enhanced Search Filter Bar */}
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          {/* Mobile Accordion Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden w-full px-4 py-4 flex items-center justify-between text-gray-900 font-medium"
          >
            <span className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#07c6e8]" />
              Search Filters
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#07c6e8] transition-transform duration-300 ${
                isFilterOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Desktop: Always visible | Mobile: Accordion content */}
          <div
            className={`
              md:block
              ${isFilterOpen ? 'block' : 'hidden'}
            `}
          >
            <form onSubmit={handleSearch} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 sm:gap-4 items-end">
                {/* Service Type */}
                <div className="flex flex-col">
                  <Label className="text-gray-700 text-xs font-medium mb-2">
                    Service
                  </Label>
                  <Select
                    value={selectedService}
                    onValueChange={(value) => {
                      setSelectedService(value);
                    }}
                  >
                    <SelectTrigger className="data-[size=default]:h-12 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hair">Hair Salon</SelectItem>
                      <SelectItem value="nails">Nail Salon</SelectItem>
                      <SelectItem value="massage">Massage</SelectItem>
                      <SelectItem value="facial">Skin Care</SelectItem>
                      <SelectItem value="brows">Brows & Lashes</SelectItem>
                      <SelectItem value="wellness">Wellness & Spa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                {/* Location */}
                <div className="relative flex flex-col">
                  <Label className="text-gray-700 text-xs font-medium mb-2">
                    Location
                  </Label>
                  <div className="relative">
                    <Select
                      value={selectedLocation}
                      onValueChange={(value) => {
                        if (value === 'current') {
                          handleUseCurrentLocation();
                        } else {
                          setSelectedLocation(value);
                          setDetectedCity('');
                        }
                      }}
                    >
                      <SelectTrigger className="data-[size=default]:h-12 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">
                          📍 Use Current Location
                        </SelectItem>
                        <SelectGroup>
                          <SelectLabel>──────────</SelectLabel>
                          <SelectItem value="Paris">Paris</SelectItem>
                          <SelectItem value="Lyon">Lyon</SelectItem>
                          <SelectItem value="Marseille">Marseille</SelectItem>
                          <SelectItem value="Nice">Nice</SelectItem>
                          <SelectItem value="Cannes">Cannes</SelectItem>
                          <SelectItem value="Toulouse">Toulouse</SelectItem>
                          <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                          <SelectItem value="Lille">Lille</SelectItem>
                          <SelectItem value="Strasbourg">Strasbourg</SelectItem>
                          <SelectItem value="Nantes">Nantes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isDetectingLocation && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-[#07c6e8] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {detectedCity && (
                    <p className="absolute top-0 right-0 sm:-bottom-22 sm:left-0 text-xs text-[#07c6e8] mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Location detected: {detectedCity}
                    </p>
                  )}
                </div>

                {/* Date and Time */}
                <div className="flex flex-col">
                  <label className="text-gray-700 text-xs font-medium mb-2">
                    Date & Time
                  </label>
                  <DateTimePicker
                    onChange={(date, timeSlot) => {
                      if (date && timeSlot) {
                        setSelectedDateTime(
                          `${date.toISOString()}_${timeSlot}`
                        );
                      }
                    }}
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2.5 sm:py-3 bg-[#07c6e8] text-white rounded-lg hover:bg-[#06b0cf] transition font-medium h-[42px] sm:h-[50px] flex items-center justify-center gap-2 text-sm sm:text-base md:self-end"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Booking Counter */}
        <div className="mt-4">
          <BookingCounter />
        </div>
      </div>
    </section>
  );
}
