import React from 'react';
import { BoundingBox } from '../types';

interface BoundingBoxLayerProps {
  boxes: BoundingBox[];
  onBoxClick?: (box: BoundingBox) => void;
}

const BoundingBoxLayer: React.FC<BoundingBoxLayerProps> = ({ boxes, onBoxClick }) => {
  if (!boxes || boxes.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 overflow-hidden">
      {boxes.map((box, index) => {
        // Calculate dimensions based on percentage (0-100)
        const top = `${box.ymin}%`;
        const left = `${box.xmin}%`;
        const width = `${box.xmax - box.xmin}%`;
        const height = `${box.ymax - box.ymin}%`;

        return (
          <div
            key={index}
            onClick={(e) => {
               if (onBoxClick) {
                 e.stopPropagation();
                 onBoxClick(box);
               }
            }}
            className="absolute border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] flex flex-col transition-all duration-300 ease-out animate-in fade-in zoom-in-95 pointer-events-auto cursor-pointer active:scale-95 active:border-green-300"
            style={{ top, left, width, height }}
            role="button"
            aria-label={`${box.label} odaklan`}
          >
            {/* Label Tag - Placed on top of the border */}
            <div className="absolute -top-7 left-[-2px] flex flex-col items-start">
               <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-tr-md uppercase tracking-wider shadow-sm">
                 {box.label}
               </span>
               {/* Small connecting triangle for style */}
               <div className="w-0 h-0 border-l-[6px] border-l-green-500 border-b-[6px] border-b-transparent"></div>
            </div>
            
            {/* Tech UI Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-green-500"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-300"></div>
            
            {/* Crosshair Center (Optional subtle effect) */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 border border-green-500/50 rounded-full opacity-50"></div>
          </div>
        );
      })}
    </div>
  );
};

export default BoundingBoxLayer;