import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', apiKey.trim());
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
        // Reload to ensure a fresh start with the new key
        window.location.reload(); 
      }, 1000);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setApiKey('');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Sistem Ayarları</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Bu uygulama Google Gemini API'si ile çalışır. Kendi API anahtarınızı girerek kullanmaya başlayabilirsiniz.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-mono font-bold text-zinc-500 mb-1 uppercase tracking-wider">
              GOOGLE API KEY
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setSaved(false);
              }}
              placeholder="AIzaSy..."
              className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors font-mono text-sm shadow-inner"
            />
          </div>

          <button
            onClick={handleSave}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all shadow-lg ${
              saved 
                ? 'bg-green-500 text-black shadow-green-900/20 scale-[0.98]' 
                : 'bg-white text-black hover:bg-zinc-200 shadow-white/10'
            }`}
          >
            {saved ? 'KAYDEDİLDİ ✓' : 'KAYDET VE BAŞLAT'}
          </button>
          
          {apiKey && (
            <button
               onClick={handleClear}
               className="text-xs text-red-500 hover:text-red-400 font-medium self-center mt-2"
            >
              Anahtarı Temizle
            </button>
          )}

          <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs text-yellow-500/80 hover:text-yellow-400 transition-colors"
            >
              <span className="group-hover:scale-110 transition-transform">🔑</span>
              <span className="underline decoration-yellow-500/30 underline-offset-4 group-hover:decoration-yellow-500">
                Google AI Studio'dan Anahtar Al
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;