import React, { useState } from 'react';

export const FloatingCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <div className="fc">
        {/* Close Button */}
        <a 
          href="#" 
          className="btn_gb" 
          onClick={(e) => {
            e.preventDefault();
            setIsVisible(false);
          }}
          title="Close"
        ></a>

        {/* QR Code */}
        <div 
          className="qr_container cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setIsZoomed(true)}
          title="Click to enlarge"
        >
          <img src="/images/qr.jpg" alt="QR Code" />
        </div>

        {/* Customer Service / Link Button (Now triggers zoom) */}
        <a 
          className="btn_lx cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsZoomed(true);
          }}
          title="Scan QR Code"
        ></a>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div 
            className="relative bg-white p-4 rounded-xl shadow-2xl max-w-md w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">Scan QR Code</h3>
            
            <div className="w-96 h-96 bg-white p-2 border-2 border-orange-200 rounded-lg mb-4 max-w-full">
              <img src="/images/qr.jpg" alt="Large QR Code" className="w-full h-full object-contain" />
            </div>
            
            <p className="text-center text-gray-600 text-sm">
              Support the project by scanning this code! ❤️
            </p>
          </div>
        </div>
      )}
    </>
  );
};
