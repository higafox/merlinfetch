
import React, { useRef, useState, useCallback } from 'react';

const MerlinFetch: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFetchClick = useCallback(() => {
    if (videoRef.current) {
      setIsPlaying(true);
      
      // Ensure we start from the very first frame
      videoRef.current.currentTime = 0;
      
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Video playback failed. Ensure 'merlin.mp4' is in the same folder as the site.", err);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      // Return to the first frame exactly as requested
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black select-none">
      {/* Edge-to-Edge Video Player */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <video
          ref={videoRef}
          src="merlin.mp4"
          className={`w-full h-full object-contain transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onEnded={handleVideoEnded}
          onLoadedData={() => setIsLoaded(true)}
          preload="auto"
          playsInline
        />
      </div>

      {/* Center UI Container */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          isPlaying ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100'
        }`}
      >
        {/* The Single Fetch Button */}
        <div className="relative group">
          <button
            onClick={handleFetchClick}
            disabled={isPlaying}
            className="relative z-10 px-16 py-8 md:px-28 md:py-14 rounded-[3rem] text-4xl md:text-6xl font-extrabold tracking-normal bg-[#ff6b35] text-white transition-all duration-500 shadow-[0_20px_60px_rgba(255,107,53,0.4)] hover:shadow-[0_30px_90px_rgba(255,107,53,0.6)] active:scale-90 hover:-translate-y-2 uppercase"
          >
            Merlin Fetch
          </button>
          
          {/* Ambient Glow Effect */}
          <div className="absolute -inset-12 bg-orange-500/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </div>
      </div>

      {/* Fallback error message detection (silent in UI) */}
      <video 
        className="hidden" 
        src="merlin.mp4" 
        onError={() => {
          console.warn("File 'merlin.mp4' not found. Make sure it's in the root directory.");
        }} 
      />

      {/* Subtle depth vignette */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
};

export default MerlinFetch;
