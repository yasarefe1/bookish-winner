import React from 'react';

const OverlayLayer: React.FC = () => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-black/60 backdrop-blur-[2px]"
      aria-hidden="true"
    />
  );
};

export default OverlayLayer;