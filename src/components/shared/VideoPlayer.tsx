'use client';

import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  thumbnail: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setHasStarted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        className="w-full aspect-video object-cover"
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play Button Overlay (shows when not started or paused) */}
      {(!hasStarted || !isPlaying) && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <Play
              className="w-10 h-10 text-[#084f5c] ml-1"
              fill="currentColor"
            />
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 transition-opacity ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-[#07c6e8] transition"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" fill="currentColor" />
            )}
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="text-white hover:text-[#07c6e8] transition"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-[#07c6e8] transition"
            aria-label="Fullscreen"
          >
            <Maximize className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
