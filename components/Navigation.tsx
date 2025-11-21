import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Menu as MenuIcon, Sun, Moon, Type, Play, AudioWaveform } from 'lucide-react';
import { AccentColor, ACCENT_COLORS, FontTheme } from '../types';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (index: number) => void;
  onMenuToggle: () => void;
  onThemeToggle: () => void;
  theme: 'dark' | 'light';
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  fontTheme: FontTheme;
  onFontChange: () => void;
  onMusicToggle: () => void;
  isMusicActive: boolean;
  isPlayerVisible: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentSlide, 
  totalSlides, 
  onPrev, 
  onNext,
  onSeek,
  onMenuToggle,
  onThemeToggle,
  theme,
  accentColor,
  onAccentChange,
  fontTheme,
  onFontChange,
  onMusicToggle,
  isMusicActive,
  isPlayerVisible
}) => {
  const isDark = theme === 'dark';
  
  const buttonClass = `
    w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
    hover:scale-110 active:scale-95
    ${isDark ? 'hover:bg-white hover:text-black text-white' : 'hover:bg-black hover:text-white text-black'}
    disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-current disabled:cursor-not-allowed
  `;

  const containerGlass = `
    backdrop-blur-xl shadow-2xl border transition-all duration-500 ease-in-out
    ${isDark ? 'bg-black/40 border-white/10 text-white shadow-black/50' : 'bg-white/60 border-black/10 text-black shadow-black/5'}
  `;

  return (
    // Container Wrapper
    <div className="fixed z-50 pointer-events-none 
        left-4 top-1/2 -translate-y-1/2 flex-col
        md:left-0 md:right-0 md:top-auto md:bottom-6 md:translate-y-0 md:flex-row md:justify-center
        flex items-center
    ">
      {/* Dynamic Bar */}
      <div className={`
        pointer-events-auto 
        flex items-center 
        flex-col gap-3 py-6 px-2 rounded-full
        md:flex-row md:gap-2 md:py-2 md:px-4
        ${containerGlass}
      `}>
        
        {/* Menu Toggle */}
        <button onClick={onMenuToggle} className={`${buttonClass} rounded-full`} aria-label="Menu">
            <MenuIcon size={18} />
        </button>

        {/* Separator (Visible on Desktop Only) */}
        <div className="hidden md:block w-[1px] h-6 bg-current opacity-10"></div>

        {/* Navigation Controls */}
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <button onClick={onPrev} disabled={currentSlide === 0} className={buttonClass}>
                <span className="md:hidden"><ChevronUp size={20} /></span>
                <span className="hidden md:block"><ChevronLeft size={20} /></span>
            </button>

            {/* Slider (Desktop Only) */}
            <div className="hidden md:flex flex-col items-center w-48 group relative px-2">
                 <div className="flex justify-between w-full text-[9px] font-mono tracking-widest opacity-50 mb-1">
                    <span>{String(currentSlide + 1).padStart(2, '0')}</span>
                    <span>{String(totalSlides).padStart(2, '0')}</span>
                </div>
                <div className="w-full h-4 flex items-center relative" style={{ color: accentColor }}>
                   <input 
                      type="range" 
                      min={0} 
                      max={totalSlides - 1} 
                      value={currentSlide} 
                      onChange={(e) => onSeek(Number(e.target.value))}
                      className="w-full h-2 bg-transparent z-20 cursor-pointer focus:outline-none"
                   />
                   <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-current opacity-20 rounded-full pointer-events-none"></div>
                </div>
            </div>

            {/* Mobile Counter */}
            <div className="md:hidden text-[9px] font-mono tracking-widest opacity-50 py-1 rotate-90 md:rotate-0 whitespace-nowrap">
                {String(currentSlide + 1).padStart(2, '0')}
            </div>

            <button onClick={onNext} disabled={currentSlide === totalSlides - 1} className={buttonClass}>
                <span className="md:hidden"><ChevronDown size={20} /></span>
                <span className="hidden md:block"><ChevronRight size={20} /></span>
            </button>
        </div>

        {/* Separator */}
        <div className="w-6 h-[1px] bg-current opacity-10 my-1 md:w-[1px] md:h-6 md:my-0"></div>

        {/* Tools */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-1">
            {/* Color Dots */}
            <div className="flex flex-col md:flex-row gap-2 items-center">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onAccentChange(color.value)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 border ${accentColor === color.value ? 'scale-150 md:scale-125 border-current' : 'scale-100 border-transparent hover:scale-110 opacity-30 hover:opacity-100'}`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>

            <button onClick={onFontChange} className={`${buttonClass} !w-8 !h-8 opacity-60 hover:opacity-100 relative group`} aria-label="Font">
                <Type size={16} />
                <div className="absolute right-full mr-2 md:right-auto md:left-1/2 md:-translate-x-1/2 md:bottom-full md:mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none capitalize">
                    {fontTheme}
                </div>
            </button>

            <button onClick={onThemeToggle} className={`${buttonClass} !w-8 !h-8 opacity-60 hover:opacity-100`} aria-label="Theme">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button 
                onClick={onMusicToggle} 
                className={`${buttonClass} !w-8 !h-8 ${isMusicActive ? 'opacity-100 text-current' : 'opacity-60 hover:opacity-100'}`} 
                aria-label="Music"
            >
                 {isMusicActive ? (
                     <AudioWaveform size={16} className="animate-pulse" style={{ color: isPlayerVisible ? accentColor : 'currentColor' }} />
                 ) : (
                     <Play size={16} />
                 )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default Navigation;