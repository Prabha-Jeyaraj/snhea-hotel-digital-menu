import React, { useEffect, useState } from "react";

interface OpeningFolioProps {
  onComplete: () => void;
}

export const OpeningFolio: React.FC<OpeningFolioProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Check if user already saw the unveil during this session
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem("hotel_sneha_unveiled");
      if (alreadySeen === "true") {
        onComplete();
        return;
      }
    }

    // Automatic entry: start the card-opening transition after a brief moment
    const timer = setTimeout(() => {
      triggerUnveil();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const triggerUnveil = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Save session flag so returning users in the same session skip directly
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hotel_sneha_unveiled", "true");
    }

    // Transition into home page automatically after card-opening animation completes
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0d] overflow-hidden flex items-center justify-center select-none">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ffd400] blur-[150px]" />
      </div>

      {/* Left Folio Panel */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#141414] border-r border-[#ffd400]/30 transition-transform duration-700 ease-out shadow-[0_0_30px_rgba(0,0,0,0.95)] ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Subtle gilded hairline seam on inner edge */}
        <div className="absolute top-0 right-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#ffd400] to-transparent shadow-[0_0_10px_#ffd400]" />
      </div>

      {/* Right Folio Panel */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#141414] border-l border-[#ffd400]/30 transition-transform duration-700 ease-out shadow-[0_0_30px_rgba(0,0,0,0.95)] ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Subtle gilded hairline seam on inner edge */}
        <div className="absolute top-0 left-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#ffd400] to-transparent shadow-[0_0_10px_#ffd400]" />
      </div>

      {/* Center Logo & Exact Copy Section */}
      <div
        className={`absolute z-30 flex flex-col items-center pointer-events-none transition-all duration-700 ease-out px-4 text-center ${
          isOpening
            ? "scale-110 opacity-0 -translate-y-3"
            : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        {/* Logo Badge */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full bg-[#ffd400]/25 blur-2xl animate-pulse" />
          <div className="w-28 h-28 rounded-full overflow-hidden bg-[#0d0d0d] p-1 border-2 border-[#ffd400] shadow-[0_0_25px_rgba(0,0,0,0.85)] flex items-center justify-center">
            <img
              src="/hotel-sneha-logo.jpg"
              alt="Hotel Sneha Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Exact Copy in Prescribed Order */}
        <div className="mt-5 flex flex-col items-center">
          {/* 1. Primary Wordmark (Largest) */}
          <h1 className="font-syne text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#fff3d6] drop-shadow-md">
            HOTEL SNEHA
          </h1>

          {/* 2. Secondary Tagline */}
          <p className="font-syne text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#ffd400] mt-1 drop-shadow-sm">
            THE MASTER MENU
          </p>

          {/* 3. Small Subline */}
          <p className="text-[12px] tracking-wide text-[#d0c6ab] mt-1.5 font-normal">
            Authentic South Indian Flavours
          </p>
        </div>

        {/* Subtle loading indicator bridge (not a button) */}
        <div className="mt-7 w-20 h-[2px] bg-[#2a2a2a] rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#ffd400] animate-pulse origin-left" />
        </div>
      </div>
    </div>
  );
};
