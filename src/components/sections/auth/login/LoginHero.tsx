'use client';

import heroImage1 from '@/assets/images/login-hero-1.png';
import heroImage2 from '@/assets/images/login-hero-2.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LoginHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const images = [heroImage1, heroImage2];

  // Sequential image fade in/out effect
  useEffect(() => {
    const displayTime = 4000; // Time each image stays visible (4 seconds)
    const fadeTime = 800; // Fade transition time (0.8 seconds)

    const cycleImages = () => {
      // Fade out current image
      setIsImageVisible(false);

      // Wait for fade out, then switch image
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

        // Immediately fade in next image
        setTimeout(() => {
          setIsImageVisible(true);
        }, 50);
      }, fadeTime);
    };

    const interval = setInterval(cycleImages, displayTime + fadeTime + 50);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Background Image - Single Image Display */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images[currentImageIndex]}
          alt="Le Beau Beauty Services"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isImageVisible ? 'opacity-40' : 'opacity-0'
          }`}
          width={6016}
          height={4080}
        />
        {/* Dark overlay to create dark tone */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900/60 via-[#084f5c]/40 to-gray-900/60"></div>
      </div>

      {/* Decorative Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {/* Top left purple blob */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-linear-to-br from-purple-300 to-purple-400 rounded-full opacity-40 blur-3xl"></div>

        {/* Top right coral blob */}
        <div className="absolute -top-32 right-0 w-96 h-96 bg-linear-to-br from-orange-300 to-orange-400 rounded-full opacity-40 blur-3xl"></div>

        {/* Bottom right purple triangle */}
        <div
          className="absolute bottom-0 -right-20 w-72 h-72 bg-linear-to-br from-purple-300 to-purple-400 opacity-40 blur-2xl"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        ></div>

        {/* Bottom left cyan blob */}
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-linear-to-br from-cyan-300 to-cyan-400 rounded-full opacity-40 blur-3xl"></div>

        {/* Middle coral blob */}
        <div className="absolute bottom-20 left-1/2 w-48 h-64 bg-linear-to-br from-red-300 to-red-400 opacity-30 blur-2xl transform -rotate-45"></div>

        {/* Dotted pattern top right */}
        <div className="absolute top-40 right-20 w-32 h-32 opacity-20 hidden lg:block">
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginHero;
