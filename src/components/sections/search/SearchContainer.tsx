'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { Business, categories, mockBusinesses } from '@/data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  SearchIcon,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BusinessModal } from '../home/BusinessModal';
import SearchHero from './SearchHero';

const SearchContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [filteredBusinesses, setFilteredBusinesses] =
    useState<Business[]>(mockBusinesses);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search filter states
  const [selectedService, setSelectedService] = useState(
    searchParams.get('category') || ''
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get('location') || ''
  );
  const [selectedDateTime, setSelectedDateTime] = useState(
    searchParams.get('datetime') || ''
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectedCity, setDetectedCity] = useState('');
  const [locationErrorModal, setLocationErrorModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: '' });

  const itemsPerPage = 9;

  useEffect(() => {
    let results = [...mockBusinesses];

    const query = searchParams.get('q')?.toLowerCase();
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const datetime = searchParams.get('datetime');

    if (query) {
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.services.some((s) => s.name.toLowerCase().includes(query))
      );
    }

    if (category) {
      results = results.filter((b) => b.category === category);
      setSelectedCategory(category);
    }

    if (location) {
      results = results.filter((b) => b.city === location);
    }

    // Note: datetime filtering would typically be done on the backend
    // For now, we just acknowledge that the filter was applied
    if (datetime) {
      // In a real app, this would filter by available time slots
      console.log('Filtering by datetime:', datetime);
    }

    // Sort
    results.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });

    setFilteredBusinesses(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchParams, sortBy]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryFilter = (categoryId: string | null) => {
    if (categoryId) {
      const newQueryString = createQueryString('category', categoryId);
      router.push(`?${newQueryString}`);
    } else {
      const newQueryString = createQueryString('category', '');
      router.push(`?${newQueryString}`);
    }
    setSelectedCategory(categoryId);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryName = () => {
    if (!selectedCategory) return 'All Services';
    return (
      categories.find((c) => c.id === selectedCategory)?.name || 'Services'
    );
  };

  const openBusinessModal = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const closeBusinessModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBusiness(null), 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new URLSearchParams object from current params
    const params = new URLSearchParams(searchParams.toString());

    // Set or remove each parameter based on filter values
    if (selectedService) {
      params.set('category', selectedService);
    } else {
      params.delete('category');
    }

    if (selectedLocation) {
      params.set('location', selectedLocation);
    } else {
      params.delete('location');
    }

    if (selectedDateTime) {
      params.set('datetime', selectedDateTime);
    } else {
      params.delete('datetime');
    }

    // Also clear the search query when using advanced filters
    params.delete('q');

    // Navigate with all parameters at once
    router.push(`?${params.toString()}`);
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

  const clearAllFilters = () => {
    // Get current path without query parameters
    const currentPath = window.location.pathname;

    // Navigate to current path without query parameters
    router.push(currentPath);

    // Reset local states
    setSelectedService('');
    setSelectedLocation('');
    setSelectedDateTime('');
    setSelectedCategory(null);
    setDetectedCity('');
    setCurrentPage(1);
  };

  // Update selectedService when category param changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedService(category);
    } else {
      setSelectedService('');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHero
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        getCategoryName={getCategoryName}
        handleSearch={handleSearch}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setSelectedDateTime={setSelectedDateTime}
        handleUseCurrentLocation={handleUseCurrentLocation}
        detectedCity={detectedCity}
        setDetectedCity={setDetectedCity}
        isDetectingLocation={isDetectingLocation}
        handleCategoryFilter={handleCategoryFilter}
        selectedCategory={selectedCategory}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Filters Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                  {selectedCategory || selectedLocation || selectedDateTime ? (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-[#07c6e8] hover:text-[#06b0cf] font-medium"
                    >
                      Clear all
                    </button>
                  ) : null}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-1">
                    <button
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                        !selectedCategory
                          ? 'bg-[#07c6e8]/10 text-[#07c6e8]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleCategoryFilter(null)}
                    >
                      All Services
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                          selectedCategory === cat.id
                            ? 'bg-[#07c6e8]/10 text-[#07c6e8]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleCategoryFilter(cat.id)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Sort By
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent text-sm font-medium text-gray-700"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-linear-to-br from-[#07c6e8] to-[#06b0cf] rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                <p className="text-white/90 text-sm mb-4">
                  Our team is here to help you find the perfect service.
                </p>
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all"
                >
                  Contact Support
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <p className="text-gray-900 font-medium">
              {filteredBusinesses.length} business
              {filteredBusinesses.length !== 1 ? 'es' : ''} found
            </p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Categories
                    </h4>
                    <div className="space-y-1">
                      <button
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                          !selectedCategory
                            ? 'bg-[#07c6e8]/10 text-[#07c6e8]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          handleCategoryFilter(null);
                          setShowFilters(false);
                        }}
                      >
                        All Services
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          className={`w-full text-left px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                            selectedCategory === cat.id
                              ? 'bg-[#07c6e8]/10 text-[#07c6e8]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            handleCategoryFilter(cat.id);
                            setShowFilters(false);
                          }}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Sort By
                    </h4>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setShowFilters(false);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07c6e8] focus:border-transparent text-sm font-medium"
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="reviews">Most Reviews</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header - Desktop Only */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredBusinesses.length} Business
                  {filteredBusinesses.length !== 1 ? 'es' : ''} Found
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredBusinesses.length)} of{' '}
                  {filteredBusinesses.length} results
                </p>
              </div>
            </div>

            {filteredBusinesses.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 lg:p-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 bg-[#07c6e8] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06b0cf] transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Business Grid */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentBusinesses.map((business) => {
                    const isBusinessFavorite = isFavorite(business.id);

                    return (
                      <div
                        key={business.id}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden relative"
                      >
                        {/* Image */}
                        <div
                          className="relative h-56 overflow-hidden cursor-pointer"
                          onClick={() => openBusinessModal(business)}
                        >
                          <Image
                            src={business.images[0]}
                            alt={business.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={800}
                            height={600}
                          />
                          {business.verified && (
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#07c6e8] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                              Verified
                            </div>
                          )}
                          {business.premium && (
                            <div className="absolute top-4 left-4 bg-linear-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                              Premium
                            </div>
                          )}

                          {/* Favorite Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(business.id);
                            }}
                            className={`absolute bottom-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm shadow-lg transition-all flex items-center justify-center ${
                              isBusinessFavorite
                                ? 'bg-[#07c6e8] text-white hover:bg-[#06b0cf]'
                                : 'bg-white/95 text-gray-600 hover:bg-white hover:text-[#07c6e8]'
                            }`}
                            aria-label={
                              isBusinessFavorite
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                            }
                          >
                            <Heart
                              className={`w-5 h-5 transition-transform ${
                                isBusinessFavorite
                                  ? 'fill-current scale-110'
                                  : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Content */}
                        <div
                          className="p-5 cursor-pointer"
                          onClick={() => openBusinessModal(business)}
                        >
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#07c6e8] transition line-clamp-1">
                            {business.name}
                          </h3>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-bold text-gray-900">
                                {business.rating}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              ({business.reviewCount} reviews)
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {business.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {business.city}
                              </span>
                            </div>
                            <div className="text-[#07c6e8] font-bold text-sm">
                              From €
                              {Math.min(
                                ...business.services.map((s) => s.price)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border transition ${
                        currentPage === 1
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          // Show first, last, current, and adjacent pages
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-lg font-semibold transition ${
                                  currentPage === page
                                    ? 'bg-[#07c6e8] text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span
                                key={page}
                                className="flex items-center px-2"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        }
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg border transition ${
                        currentPage === totalPages
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BusinessModal
          business={selectedBusiness}
          isOpen={isModalOpen}
          onClose={closeBusinessModal}
        />
      )}

      {/* Location Error Modal */}
      {locationErrorModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-fadeIn">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-red-600" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              Location Access Required
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {locationErrorModal.message}
            </p>

            {/* Button */}
            <button
              onClick={() =>
                setLocationErrorModal({ isOpen: false, message: '' })
              }
              className="w-full px-6 py-3 bg-[#07c6e8] text-white rounded-lg font-semibold hover:bg-[#06b0cf] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
