import React, { useState } from 'react';

export const FloatingCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fc">
      {/* Close Button */}
      <a 
        href="#" 
        className="btn_gb" 
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(false);
        }}
      ></a>

      {/* QR Code */}
      <div className="qr_container">
        <img src="/images/qr.jpg" alt="QR Code" />
      </div>

      {/* Customer Service / Link Button */}
      <a 
        target="_blank" 
        href="https://kf.qq.com/touch/kfgames/A1109/v2/PCweb/conf/index.html?scene_id=CSCE20260130124511XohmgTaS" 
        className="btn_lx"
        rel="noreferrer"
      ></a>
    </div>
  );
};
