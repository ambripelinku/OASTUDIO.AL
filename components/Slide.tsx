import React from 'react';
import { SlideData, SlideType, AccentColor, FontTheme } from '../types';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface SlideProps {
  data: SlideData;
  theme: 'dark' | 'light';
  accentColor: AccentColor;
  fontTheme: FontTheme;
}

const Slide: React.FC<SlideProps> = ({ data, theme, accentColor, fontTheme }) => {
  const isDark = theme === 'dark';
  
  // Styles
  const bgClass = isDark ? 'bg-black' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-black';
  const textSecondary = isDark ? 'text-gray-500' : 'text-gray-400';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';
  
  // Dynamic Font Class
  const displayFont = `font-${fontTheme}`;

  // Moving Ambient Background (Dynamic Multi-Blob)
  const AmbientBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
            className={`absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[150px] animate-blob-1 transition-all duration-1000 ${isDark ? 'mix-blend-screen opacity-30' : 'mix-blend-multiply opacity-20'}`}
            style={{ backgroundColor: accentColor }}
        />
        <div 
            className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-blob-2 transition-all duration-1000 ${isDark ? 'mix-blend-screen opacity-20' : 'mix-blend-multiply opacity-10'}`}
            style={{ backgroundColor: isDark ? '#ffffff' : '#cccccc' }}
        />
         <div 
            className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] animate-blob-3 transition-all duration-1000 ${isDark ? 'mix-blend-screen opacity-20' : 'mix-blend-multiply opacity-10'}`}
            style={{ backgroundColor: accentColor }}
        />
    </div>
  );

  // Added pl-20 for mobile to account for floating left navbar, md:px-16 for desktop
  const contentContainerClass = `
    relative z-10 w-full min-h-full flex flex-col max-w-[1800px] mx-auto px-6 pl-20 md:px-16 py-12 md:py-24
  `;

  const renderContent = () => {
    switch (data.type) {
      case SlideType.WELCOME:
         return null;

      case SlideType.COVER:
        return (
          <div className={`${contentContainerClass} justify-between`}>
             <div className="flex justify-between items-start animate-enter border-b border-current/10 pb-8">
                <div className="flex items-center gap-3">
                    <Logo className="w-6 h-6 md:w-8 md:h-8" color={accentColor} />
                    <span className={`${displayFont} font-bold tracking-widest uppercase text-sm md:text-base`}>OAStudio</span>
                </div>
                <div className={`text-right font-mono text-[8px] md:text-[10px] tracking-widest uppercase ${textSecondary}`}>
                    <div>Brand Guidelines</div>
                    <div>Version 2.0</div>
                </div>
             </div>

             <div className="mb-12 animate-enter" style={{ animationDelay: '0.1s' }}>
                <div 
                  className="w-12 h-12 md:w-16 md:h-16 border rounded-full mb-8 flex items-center justify-center transition-colors duration-500"
                  style={{ borderColor: accentColor }}
                >
                    <div 
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                </div>
                {/* Responsive text sizing using min/max via clamp or Tailwind breakpoints */}
                <h1 className={`text-5xl md:text-[8vw] lg:text-[10vw] leading-[0.9] font-bold tracking-tighter ${displayFont} uppercase break-words mix-blend-exclusion`}>
                  {data.title}
                </h1>
                <p className={`mt-8 text-lg md:text-3xl font-light ${displayFont} uppercase tracking-widest ${textSecondary}`}>
                  {data.subtitle}
                </p>
             </div>
          </div>
        );

      case SlideType.SECTION_HEADER:
        return (
          <div className={`${contentContainerClass} justify-center`}>
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 h-full items-center animate-enter content-center">
                <div className="lg:col-span-4 flex items-center justify-start">
                     <span 
                        className={`text-[8rem] md:text-[20vw] lg:text-[15vw] font-bold ${displayFont} leading-none tracking-tighter transition-colors duration-500`}
                        style={{ color: accentColor }}
                     >
                        {data.sectionNumber}
                     </span>
                </div>
                
                <div className="lg:col-span-8 flex flex-col justify-center space-y-4 lg:space-y-6 pl-0 lg:pl-12 lg:border-l border-current/10">
                    <h1 className={`text-4xl md:text-6xl lg:text-8xl font-semibold ${displayFont} uppercase leading-[0.9] tracking-tight`}>
                        {data.title}
                    </h1>
                    <p className={`text-sm md:text-xl font-mono uppercase tracking-widest max-w-xl ${textSecondary}`}>
                        {data.subtitle}
                    </p>
                </div>
             </div>
          </div>
        );

      case SlideType.CONTENT_TEXT:
        return (
            <div className={`${contentContainerClass} justify-center`}>
                <div className="w-full max-w-5xl animate-enter relative">
                    <div 
                      className="absolute -left-4 md:-left-8 top-0 h-full w-[1px] transition-colors duration-500"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    <div className="pl-6 md:pl-12">
                        <div className="flex items-center gap-4 mb-8 md:mb-12 opacity-50">
                            <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase">
                                {data.sectionNumber} — {data.title}
                            </span>
                        </div>
                        <p className={`text-2xl md:text-5xl lg:text-6xl font-normal ${displayFont} leading-[1.3] tracking-tight ${textPrimary}`}>
                            {data.content}
                        </p>
                    </div>
                </div>
            </div>
        );

      case SlideType.CONTENT_LIST:
        return (
          <div className={contentContainerClass}>
             <div className="flex flex-col h-full animate-enter">
                {/* Header */}
                <div className={`pb-6 md:pb-8 mb-8 md:mb-12 flex justify-between items-end border-b ${borderClass}`}>
                    <h2 className={`text-3xl md:text-6xl font-bold ${displayFont} tracking-tight uppercase`}>{data.title}</h2>
                    <span 
                      className="hidden md:block font-mono text-xs tracking-widest transition-colors duration-500"
                      style={{ color: accentColor }}
                    >
                      0{data.sectionNumber}
                    </span>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-4">
                         <p className={`text-xs md:text-sm font-mono uppercase tracking-widest leading-relaxed sticky top-12 ${textSecondary}`}>
                            [ {data.subtitle} ]
                         </p>
                    </div>
                    <div className="col-span-1 lg:col-span-8">
                        {Array.isArray(data.content) && (
                            <ul className="flex flex-col gap-4 md:gap-6">
                                {data.content.map((item, idx) => (
                                    <li key={idx} className={`group flex items-start md:items-center py-3 md:py-4 border-b border-transparent transition-colors duration-300 hover:border-current`}>
                                        <div 
                                          className="w-1.5 h-1.5 md:w-2 md:h-2 mt-2 md:mt-0 mr-4 md:mr-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
                                          style={{ backgroundColor: accentColor }}
                                        ></div>
                                        <span className={`text-xl md:text-4xl ${displayFont} font-light tracking-tight`}>
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {data.details && (
                            <div className="flex flex-col gap-4">
                                {data.details.map((item, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-4 md:p-6 border ${borderClass} hover:bg-white/5 transition-colors rounded-lg`}>
                                        <span 
                                          className="font-mono text-xs md:text-sm uppercase tracking-widest"
                                          style={{ color: accentColor }}
                                        >
                                          {item.label}
                                        </span>
                                        <span className={`text-xl md:text-4xl font-bold ${displayFont}`}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
             </div>
          </div>
        );

      case SlideType.PALETTE:
        return (
          <div className={`${contentContainerClass} !px-0 !py-0 !pl-16 md:!pl-0`}>
             <div className="min-h-screen w-full flex flex-col lg:flex-row animate-enter">
                {[
                    { color: '#000000', name: 'Obsidian', hex: '#000000', text: 'text-white' },
                    { color: accentColor, name: 'Accent', hex: accentColor, text: 'text-black' },
                    { color: '#F7F5F2', name: 'Warm White', hex: '#F7F5F2', text: 'text-black' },
                    { color: '#1A1A1A', name: 'Charcoal', hex: '#1A1A1A', text: 'text-white' },
                ].map((swatch, idx) => (
                    <div 
                        key={swatch.color} 
                        className={`relative flex-1 min-h-[25vh] lg:min-h-full flex flex-col justify-between p-6 md:p-12 hover:flex-[1.5] lg:hover:flex-[2] transition-all duration-500 group`} 
                        style={{ backgroundColor: swatch.color }}
                    >
                        <div className="flex justify-between items-start">
                            <span className={`font-mono text-xs uppercase tracking-widest opacity-60 ${swatch.text}`}>0{idx+1}</span>
                            <Logo className={`w-4 h-4 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity`} color={swatch.text === 'text-white' ? 'white' : 'black'} />
                        </div>
                        
                        <div className={`${swatch.text} space-y-1`}>
                            <h3 className={`font-bold text-2xl md:text-5xl ${displayFont} uppercase tracking-tighter`}>{swatch.name}</h3>
                            <p className="font-mono text-xs md:text-sm opacity-60">{swatch.hex}</p>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        );

      case SlideType.TYPOGRAPHY:
        return (
            <div className={contentContainerClass}>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 h-full animate-enter items-center content-center">
                    {/* Left Column */}
                    <div>
                        <h1 className={`text-[6rem] md:text-[12vw] leading-[0.8] font-bold tracking-tighter ${displayFont} mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600`}>
                            Aa
                        </h1>
                        <div 
                          className="space-y-4 border-l-4 pl-6 md:pl-8"
                          style={{ borderColor: accentColor }}
                        >
                             <h2 className={`text-3xl md:text-5xl font-bold ${displayFont} capitalize`}>{fontTheme}</h2>
                             <p className={`font-mono text-xs md:text-sm uppercase tracking-widest ${textSecondary}`}>Primary Typeface</p>
                        </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-12 md:space-y-16">
                         <div className="space-y-6">
                            <p className={`text-2xl md:text-4xl lg:text-5xl leading-tight font-light ${displayFont}`}>
                                "Design is intelligence made visible."
                            </p>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                             <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                                 <span className={`block text-3xl md:text-4xl font-bold ${displayFont} mb-2`}>Bold</span>
                                 <span className="font-mono text-[10px] uppercase opacity-50">Headlines</span>
                             </div>
                             <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                                 <span className={`block text-3xl md:text-4xl font-light ${displayFont} mb-2`}>Light</span>
                                 <span className="font-mono text-[10px] uppercase opacity-50">Body Copy</span>
                             </div>
                         </div>
                    </div>
                 </div>
            </div>
        );

      case SlideType.ENDING:
        return (
             <div className={`${contentContainerClass} justify-center bg-black`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center animate-enter z-10 relative">
                   
                    {/* Left: Brand Symbol */}
                    <div className="flex flex-col justify-between h-[30vh] lg:h-[60vh] border-l border-white/10 pl-6 lg:pl-12">
                         <Logo className="w-24 h-24 md:w-48 md:h-48" color={accentColor} />
                         <div>
                             <h1 className={`text-6xl md:text-[10rem] leading-none font-bold ${displayFont} uppercase tracking-tighter text-white mix-blend-difference`}>
                                 {data.title}
                             </h1>
                             <p className={`font-mono text-xs md:text-sm uppercase tracking-widest text-gray-500 mt-4`}>System Shutdown</p>
                         </div>
                    </div>

                    {/* Right: Contact Grid */}
                    <div className="flex flex-col gap-8 md:gap-12">
                         <div className="space-y-2">
                            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Inquiries</span>
                            <a 
                              href={`mailto:${data.subtitle}`} 
                              className={`block text-2xl md:text-5xl ${displayFont} font-light hover:text-[${accentColor}] transition-colors break-all md:break-normal`}
                            >
                                {data.subtitle}
                            </a>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                             <div>
                                 <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">Studio</span>
                                 <p className="text-lg md:text-xl">Tirana, Albania</p>
                             </div>
                             <div>
                                 <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">Social</span>
                                 <p className="text-lg md:text-xl">@oastudio.al</p>
                             </div>
                         </div>
                    </div>
                </div>
             </div>
        );

      default:
        return <div className={`${contentContainerClass} flex items-center justify-center`}>Slide type not supported</div>;
    }
  };

  return (
    <div className={`w-full h-screen ${bgClass} ${textPrimary} transition-colors duration-500 relative flex flex-col overflow-hidden`}>
       <AmbientBackground />
       {/* Main Scrollable Area */}
       <div id="slide-scroll-container" className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 scroll-smooth">
           {renderContent()}
       </div>
    </div>
  );
};

export default Slide;