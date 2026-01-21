'use client';

import { DateTimePicker } from '@/components/shared/DateTimePicker';
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
import { categories } from '@/data/mockData';
import { ChevronDown, MapPin, SearchIcon } from 'lucide-react';
import { FormEvent } from 'react';

interface SearchHeroProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  getCategoryName: () => string;
  handleSearch: (e: FormEvent<Element>) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setSelectedDateTime: (dateTime: string) => void;
  handleUseCurrentLocation: () => void;
  detectedCity: string;
  setDetectedCity: (city: string) => void;
  isDetectingLocation: boolean;
  handleCategoryFilter: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const SearchHero = ({
  isFilterOpen,
  setIsFilterOpen,
  getCategoryName,
  handleSearch,
  selectedService,
  setSelectedService,
  selectedLocation,
  setSelectedLocation,
  setSelectedDateTime,
  handleUseCurrentLocation,
  detectedCity,
  setDetectedCity,
  isDetectingLocation,
  handleCategoryFilter,
  selectedCategory,
}: SearchHeroProps) => {
  return (
    <div className="bg-linear-to-br from-[#084f5c] to-[#0a6170] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pb-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {getCategoryName()}
          </h1>
          <p className="text-lg lg:text-xl text-white/90 mb-8">
            Discover premium beauty and wellness services from verified
            professionals across France
          </p>

          {/* Enhanced Search Filter Bar */}
          <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
            {/* Mobile Accordion Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden w-full px-4 py-4 flex items-center justify-between text-gray-900 font-medium"
            >
              <span className="flex items-center gap-2">
                <SearchIcon className="w-5 h-5 text-[#07c6e8]" />
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
              <form
                onSubmit={handleSearch}
                className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 sm:gap-4 items-end"
              >
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
                    <SelectTrigger className="data-[size=default]:h-12 w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#07c6e8] focus-visible:border-transparent">
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
                <div className="flex flex-col sm:col-span-2 md:col-span-1">
                  <Label className="text-gray-700 text-xs font-medium mb-2">
                    Date & Time
                  </Label>
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
                  className="sm:col-span-2 md:col-span-1 px-6 py-2.5 sm:py-3 bg-[#07c6e8] text-white rounded-lg hover:bg-[#06b0cf] transition font-medium h-[42px] sm:h-[50px] flex items-center justify-center gap-2 text-sm sm:text-base md:self-end"
                >
                  <SearchIcon className="w-4 h-4" />
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Quick Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#07c6e8] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
