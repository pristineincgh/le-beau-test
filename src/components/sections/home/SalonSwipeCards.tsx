import { Clock, Heart, MapPin, Sparkles, Star, X } from 'lucide-react';
import { motion, PanInfo } from 'motion/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Salon {
  id: number;
  name: string;
  emoji: string;
  rating: number;
  matchScore: number;
  distance: string;
  location: string;
  availability: string;
  price: string;
  specialty: string;
  image: string;
}

const salons: Salon[] = [
  {
    id: 1,
    name: '7th Heaven Beauty',
    emoji: '💅',
    rating: 4.93,
    matchScore: 98,
    distance: '0.8km',
    location: 'Henley',
    availability: 'Today 3:00 PM',
    price: '€45',
    specialty: 'Manicure & Pedicure',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'The Barber Studio',
    emoji: '✂️',
    rating: 4.87,
    matchScore: 95,
    distance: '1.2km',
    location: 'Paris 8e',
    availability: 'Tomorrow 10:00 AM',
    price: '€38',
    specialty: 'Classic Haircut',
    image:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Bella Spa & Wellness',
    emoji: '🧖',
    rating: 4.95,
    matchScore: 92,
    distance: '2.1km',
    location: 'Lyon',
    availability: 'Today 5:00 PM',
    price: '€65',
    specialty: 'Full Body Massage',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Luxe Hair Lounge',
    emoji: '💇',
    rating: 4.91,
    matchScore: 89,
    distance: '0.5km',
    location: 'Marseille',
    availability: 'Today 2:30 PM',
    price: '€55',
    specialty: 'Color & Highlights',
    image:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Fresh Fade Barbers',
    emoji: '💈',
    rating: 4.88,
    matchScore: 94,
    distance: '1.8km',
    location: 'Nice',
    availability: 'Tomorrow 11:00 AM',
    price: '€42',
    specialty: 'Fade & Beard Trim',
    image:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
  },
];

export const SalonSwipeCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const autoSwipeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const currentSalon = salons[currentIndex];

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % salons.length);
      setDirection(null);
    }, 300);
  };

  // Auto-swipe functionality
  useEffect(() => {
    // Clear any existing timer
    if (autoSwipeTimerRef.current) {
      clearTimeout(autoSwipeTimerRef.current);
    }

    // Only start auto-swipe if user is not interacting
    if (!isUserInteracting) {
      autoSwipeTimerRef.current = setTimeout(() => {
        handleSwipe('right'); // Auto-swipe right (like) after 3 seconds
      }, 3000);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoSwipeTimerRef.current) {
        clearTimeout(autoSwipeTimerRef.current);
      }
    };
  }, [currentIndex, isUserInteracting]);

  const handleDragStart = () => {
    setIsUserInteracting(true);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe('right');
    } else if (info.offset.x < -threshold) {
      handleSwipe('left');
    }

    // Reset user interaction after a short delay
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 500);
  };

  const handleButtonClick = (dir: 'left' | 'right') => {
    setIsUserInteracting(true);
    handleSwipe(dir);

    // Reset user interaction after a short delay
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 500);
  };

  if (!currentSalon) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-linear-to-r from-[#07c6e8] to-[#084f5c] p-3 rounded-t-[2rem]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-xs">Le Beau Match</h3>
            <p className="text-white/80 text-[9px]">Find your perfect salon</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-white text-[9px] font-semibold">
              {currentIndex + 1}/{salons.length}
            </span>
          </div>
        </div>
      </div>

      {/* Card Stack Area */}
      <div className="flex-1 relative overflow-hidden p-3">
        {/* Background Cards */}
        {salons
          .slice(currentIndex + 1, currentIndex + 3)
          .map((salon, index) => (
            <div
              key={salon.id}
              className="absolute inset-3 bg-gray-100 rounded-2xl border border-gray-200"
              style={{
                transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 8}px)`,
                zIndex: 10 - index,
                opacity: 1 - (index + 1) * 0.3,
              }}
            />
          ))}

        {/* Active Card */}
        <motion.div
          key={currentSalon.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={
            direction === 'left'
              ? { x: -300, opacity: 0, rotate: -20 }
              : direction === 'right'
                ? { x: 300, opacity: 0, rotate: 20 }
                : { x: 0, opacity: 1, rotate: 0 }
          }
          transition={{ duration: 0.3 }}
          className="absolute inset-3 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ zIndex: 20 }}
        >
          {/* Salon Image */}
          <div className="relative h-24 bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden">
            <Image
              src={currentSalon.image}
              alt={currentSalon.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

            {/* Match Score Badge */}
            <div className="absolute top-2 right-2 bg-[#07c6e8] px-2 py-1 rounded-full">
              <div className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-white" />
                <span className="text-white font-bold text-[9px]">
                  {currentSalon.matchScore}% Match
                </span>
              </div>
            </div>

            {/* Emoji Badge */}
            <div className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <span className="text-base">{currentSalon.emoji}</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-3 space-y-2">
            {/* Name & Rating */}
            <div>
              <h3 className="font-bold text-gray-900 text-xs mb-0.5">
                {currentSalon.name}
              </h3>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-2 h-2 ${
                        star <= Math.floor(currentSalon.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[8px] text-gray-600 font-medium">
                  {currentSalon.rating}
                </span>
              </div>
            </div>

            {/* Specialty */}
            <div className="bg-[#07c6e8]/10 px-2 py-1 rounded-md inline-block">
              <span className="text-[8px] text-[#084f5c] font-semibold">
                {currentSalon.specialty}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[8px] text-gray-600">
                <MapPin className="w-2.5 h-2.5" />
                <span>
                  {currentSalon.distance} • {currentSalon.location}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[8px] text-gray-600">
                <Clock className="w-2.5 h-2.5" />
                <span>{currentSalon.availability}</span>
              </div>
            </div>

            {/* Price */}
            <div className="pt-1 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-gray-500">Starting at</span>
                <span className="text-xs font-bold text-[#084f5c]">
                  {currentSalon.price}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 flex items-center justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('left')}
          className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg hover:border-red-400 hover:bg-red-50 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('right')}
          className="w-12 h-12 rounded-full bg-[#07c6e8] flex items-center justify-center shadow-lg hover:shadow-xl transition"
        >
          <Heart className="w-5 h-5 text-white fill-white" />
        </motion.button>
      </div>

      {/* Swipe Hint */}
      <div className="px-3 pb-3 text-center">
        <p className="text-[8px] text-gray-400">Swipe or tap to explore</p>
      </div>
    </div>
  );
};
