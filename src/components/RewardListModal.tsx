import React from 'react';

interface RewardListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RewardListModal: React.FC<RewardListModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose} // Close on click outside
    >
      {/* Modal Container */}
      <div 
        className="relative w-[1000px] h-[80vh] bg-[#fff5e6] rounded-2xl border-4 border-orange-200 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent close on click inside
      >
        {/* Header */}
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-orange-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-[#fff8e7] rounded-lg overflow-hidden shadow-2xl border-4 border-orange-300">
           <img 
             src="/images/fc14.png" 
             alt="Reward List" 
             className="w-full h-auto max-h-[80vh] object-contain block"
           />
        </div>
      </div>
    </div>
  );
};
