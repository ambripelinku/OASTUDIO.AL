import React from 'react';
import { Minus, Power } from 'lucide-react';
import { AccentColor } from '../types';

interface MusicPlayerProps {
  isActive: boolean; // Should iframe be loaded?
  isVisible: boolean; // Should window be shown?
  onMinimize: () => void;
  onStop: () => void;
  theme: 'dark' | 'light';
  accentColor: AccentColor;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isActive, isVisible, onMinimize, onStop, theme, accentColor }) => {
  // If not active, don't render anything (music stops)
  if (!isActive) return null;

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black/80 border-white/10 shadow-black/50' : 'bg-white/80 border-black/10 shadow-black/10';
  const textClass = isDark ? 'text-white' : 'text-black';

  return (
    <div className={`
        fixed z-[60] 
        bottom-24 right-4 w-[300px] md:w-[350px] 
        rounded-2xl border backdrop-blur-2xl shadow-2xl 
        overflow-hidden transition-all duration-500 ease-in-out
        flex flex-col
        ${bgClass}
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}
    `}>
        <div className="flex justify-between items-center p-3 border-b border-current/10">
            <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest ${textClass} opacity-70`}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
                Soundscape
            </div>
            <div className="flex items-center gap-1">
                <button 
                    onClick={onMinimize}
                    className={`p-1.5 rounded-full hover:bg-current/10 transition-colors ${textClass}`}
                    title="Minimize (Keep Playing)"
                >
                    <Minus size={14} />
                </button>
                <button 
                    onClick={onStop}
                    className={`p-1.5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors ${textClass}`}
                    title="Power Off"
                >
                    <Power size={14} />
                </button>
            </div>
        </div>
        <div className="w-full h-[352px]">
            <iframe 
                style={{ borderRadius: '0px' }} 
                src="https://open.spotify.com/embed/playlist/0ej4YNptsYtdPEYN5y4bvc?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
            ></iframe>
        </div>
    </div>
  );
};

export default MusicPlayer;