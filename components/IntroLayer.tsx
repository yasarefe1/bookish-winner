import React, { useEffect, useState } from 'react';

interface IntroLayerProps {
  onComplete: () => void;
}

const IntroLayer: React.FC<IntroLayerProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Simulation of system boot sequence
    const bootSequence = [
      { t: 100, msg: "INITIALIZING KERNEL..." },
      { t: 400, msg: "LOADING NEURAL MODULES..." },
      { t: 800, msg: "ACCESSING OPTICAL SENSORS..." },
      { t: 1200, msg: "CALIBRATING AI VISION..." },
      { t: 1800, msg: "ESTABLISHING SECURE CONNECTION..." },
      { t: 2200, msg: "SYSTEM READY." }
    ];

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Speed of loading
      });
    }, 40);

    // Log text animation
    bootSequence.forEach((item) => {
      setTimeout(() => {
        setLogs((prev) => [...prev.slice(-4), item.msg]); // Keep last 5 logs
      }, item.t);
    });

    // Finish sequence
    const finishTimeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(onComplete, 800); // Wait for fade out animation
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`absolute top-0 left-0 w-full h-full bg-black z-50 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 ease-in-out ${isFading ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Main Logo / Eye Animation */}
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-full border-2 border-zinc-800 flex items-center justify-center relative">
          {/* Rotating Ring */}
          <div className="absolute inset-0 border-t-2 border-yellow-500 rounded-full animate-spin [animation-duration:3s]" />
          
          {/* Inner Eye */}
          <div className={`w-16 h-16 bg-yellow-500 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-all duration-300 ${progress > 90 ? 'scale-100' : 'scale-0 animate-pulse'}`} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
        ÜÇÜNCÜ GÖZ
      </h1>
      <p className="text-yellow-500/80 text-xs font-mono tracking-[0.5em] mb-8">
        AI VISION SYSTEM
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden mb-4 relative">
        <div 
          className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Terminal Logs */}
      <div className="h-20 flex flex-col items-center justify-end overflow-hidden">
        {logs.map((log, index) => (
          <p key={index} className="text-[10px] font-mono text-zinc-500 uppercase animate-pulse">
            {`> ${log}`}
          </p>
        ))}
      </div>

      {/* Footer Version */}
      <div className="absolute bottom-8 text-zinc-800 text-[10px] font-mono">
        v2.5.0-RC • GEMINI POWERED
      </div>
    </div>
  );
};

export default IntroLayer;