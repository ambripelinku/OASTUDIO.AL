import React from 'react';
import { X, ArrowRight, MousePointer2 } from 'lucide-react';
import { SlideData, SlideType, AccentColor, FontTheme } from '../types';
import Logo from './Logo';

interface MenuProps {
  slides: SlideData[];
  currentIndex: number;
  onClose: () => void;
  onJumpTo: (index: number) => void;
  theme: 'dark' | 'light';
  accentColor: AccentColor;
  fontTheme: FontTheme;
}

const Menu: React.FC<MenuProps> = ({ slides, currentIndex, onClose, onJumpTo, theme, accentColor, fontTheme }) => {
  const isDark = theme === 'dark';
  
  // Glass styles
  const overlayClass = isDark 
    ? 'bg-black/90 backdrop-blur-xl text-white' 
    : 'bg-white/95 backdrop-blur-xl text-black';

  const displayFont = fontTheme === 'classic' ? 'font-serif-display' : 'font-display';

  // Group slides by section
  const sections: { title: string; slides: { data: SlideData; index: number }[] }[] = [];
  let currentSectionTitle = "Prologue";
  
  slides.forEach((slide, index) => {
    if (slide.type === SlideType.SECTION_HEADER || slide.type === SlideType.WELCOME || slide.type === SlideType.ENDING) {
      currentSectionTitle = slide.title;
    }
    // Find existing section or create new
    let section = sections.find(s => s.title === currentSectionTitle);
    if (!section) {
      section = { title: currentSectionTitle, slides: [] };
      sections.push(section);
    }
    section.slides.push({ data: slide, index });
  });

  return (
    <div className={`fixed inset-0 z-[100] ${overlayClass} transition-all duration-700 flex flex-col animate-enter overflow-hidden`}>
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Header */}
      <div className="relative z-10 p-6 md:p-8 flex justify-between items-center border-b border-current/10 shrink-0">
        <div className="flex items-center gap-6 opacity-100">
           <Logo className="w-10 h-10" color={accentColor} />
           <div>
               <h1 className={`${displayFont} font-black text-2xl tracking-tighter uppercase`}>OAStudio</h1>
               <p className="text-[10px] font-mono tracking-widest opacity-60 flex items-center gap-2">
                  SYSTEM NAVIGATOR <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
               </p>
           </div>
        </div>
        <button 
            onClick={onClose} 
            className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center transition-all duration-300 hover:text-black hover:scale-110"
            style={{}}
             onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = accentColor;
                 e.currentTarget.style.borderColor = accentColor;
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'transparent';
                 e.currentTarget.style.borderColor = '';
             }}
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Content - Compact Grid for Full Screen fit */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 py-8">
        <div className="max-w-[1800px] mx-auto h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {sections.map((section, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-4 opacity-0 animate-enter group" style={{ animationDelay: `${sIdx * 0.05}s` }}>
                    <div className="flex items-baseline justify-between border-b-2 pb-2 transition-colors duration-500 border-current/10 group-hover:border-current">
                        <h3 className="text-lg font-bold font-display uppercase tracking-tighter truncate pr-2">
                             {section.title}
                        </h3>
                        <span 
                            className="font-mono text-xs font-bold shrink-0"
                            style={{ color: accentColor }}
                        >
                            0{sIdx + 1}
                        </span>
                    </div>
                
                    <div className="flex flex-col gap-1">
                        {section.slides.map(({ data, index }) => (
                        <button
                            key={index}
                            onClick={() => onJumpTo(index)}
                            className={`group/item relative text-left py-2 pl-3 transition-all duration-300 hover:pl-6 ${
                                index === currentIndex 
                                ? 'opacity-100' 
                                : 'opacity-40 hover:opacity-100'
                            }`}
                        >
                            {/* Active/Hover Indicator Line */}
                            <div 
                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300 group-hover/item:h-full group-hover/item:rounded-sm ${index === currentIndex ? 'h-full rounded-sm' : ''}`}
                                style={{ backgroundColor: accentColor }}
                            ></div>

                            <span className={`text-lg ${displayFont} font-medium truncate block tracking-tight leading-none`}>
                                {data.title}
                            </span>
                            {data.subtitle && (
                                <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 mt-1 block truncate">
                                    {data.subtitle}
                                </span>
                            )}
                        </button>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>
      
      {/* Footer Decoration */}
      <div className="relative z-10 p-4 border-t border-current/10 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest opacity-40 shrink-0">
          <span>Use Arrow Keys or Drag Slider</span>
          <span>Designed with Gemini Intelligence</span>
      </div>
    </div>
  );
};

export default Menu;