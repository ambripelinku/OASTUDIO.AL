import React, { useState, useEffect, useCallback, useRef } from 'react';
import Slide from './components/Slide';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import MusicPlayer from './components/MusicPlayer';
import { SLIDES } from './constants';
import { AccentColor, ACCENT_COLORS, FontTheme } from './types';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [accentColor, setAccentColor] = useState<AccentColor>(ACCENT_COLORS[0].value);
  const [fontTheme, setFontTheme] = useState<FontTheme>('manrope');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Music State: Separated to allow background play
  const [isMusicActive, setIsMusicActive] = useState(false); // Is the iframe loaded/playing?
  const [isPlayerVisible, setIsPlayerVisible] = useState(false); // Is the window shown?
  
  // Refs for scroll debouncing
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSeek = (index: number) => {
      setCurrentSlideIndex(Math.max(0, Math.min(index, SLIDES.length - 1)));
  };

  const handleJumpTo = (index: number) => {
    setCurrentSlideIndex(index);
    setIsMenuOpen(false);
  };

  const handleFontChange = () => {
    setFontTheme(prev => {
      if (prev === 'manrope') return 'outfit';
      if (prev === 'outfit') return 'ubuntu';
      if (prev === 'ubuntu') return 'oswald';
      return 'manrope';
    });
  };

  // Music Handlers
  const handleMusicToggle = () => {
    if (!isMusicActive) {
        // Turn On
        setIsMusicActive(true);
        setIsPlayerVisible(true);
    } else {
        // Toggle Window Visibility (Keep playing)
        setIsPlayerVisible(!isPlayerVisible);
    }
  };

  const handleMusicStop = () => {
      setIsMusicActive(false);
      setIsPlayerVisible(false);
  };

  // Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isMenuOpen) {
        if (e.key === 'Escape') setIsMenuOpen(false);
        return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      handleNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      handlePrev();
    }
  }, [handleNext, handlePrev, isMenuOpen]);

  // Smart Scroll / Wheel Navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMenuOpen) return;
    
    // Check if the event target is inside the scrollable slide container
    const scrollContainer = document.getElementById('slide-scroll-container');
    
    if (scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollable = scrollHeight > clientHeight;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 2;

      if (isScrollable) {
        // If going down and not at bottom, let it scroll
        if (e.deltaY > 0 && !isAtBottom) return;
        // If going up and not at top, let it scroll
        if (e.deltaY < 0 && !isAtTop) return;
      }
    }

    // Debounce for slide switching
    const now = Date.now();
    if (now - lastScrollTime.current < 500) return; 

    if (e.deltaY > 30) {
      handleNext();
      lastScrollTime.current = now;
    } else if (e.deltaY < -30) {
      handlePrev();
      lastScrollTime.current = now;
    }
  }, [handleNext, handlePrev, isMenuOpen]);

  // Touch / Swipe Navigation
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isMenuOpen) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) { // Threshold
      if (diff > 0) {
        handleNext(); // Swipe Up -> Next
      } else {
        handlePrev(); // Swipe Down -> Prev
      }
    }
  }, [handleNext, handlePrev, isMenuOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleKeyDown, handleWheel, handleTouchStart, handleTouchEnd]);

  const currentSlideData = SLIDES[currentSlideIndex];

  return (
    <main className="antialiased relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white/20">
      <Slide 
        data={currentSlideData} 
        theme={theme} 
        accentColor={accentColor}
        fontTheme={fontTheme}
      />
      
      <Navigation 
        currentSlide={currentSlideIndex} 
        totalSlides={SLIDES.length} 
        onNext={handleNext} 
        onPrev={handlePrev}
        onSeek={handleSeek}
        onMenuToggle={() => setIsMenuOpen(true)}
        onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        theme={theme}
        accentColor={accentColor}
        onAccentChange={setAccentColor}
        fontTheme={fontTheme}
        onFontChange={handleFontChange}
        onMusicToggle={handleMusicToggle}
        isMusicActive={isMusicActive}
        isPlayerVisible={isPlayerVisible}
      />

      <MusicPlayer 
        isActive={isMusicActive}
        isVisible={isPlayerVisible}
        onMinimize={() => setIsPlayerVisible(false)}
        onStop={handleMusicStop} 
        theme={theme}
        accentColor={accentColor}
      />

      {isMenuOpen && (
        <Menu 
            slides={SLIDES} 
            currentIndex={currentSlideIndex} 
            onClose={() => setIsMenuOpen(false)} 
            onJumpTo={handleJumpTo}
            theme={theme}
            accentColor={accentColor}
            fontTheme={fontTheme}
        />
      )}
      
      {!process.env.API_KEY && (
        <div className="fixed top-0 left-0 w-full text-black text-[10px] font-mono uppercase tracking-widest p-1 text-center z-[200]" style={{ backgroundColor: accentColor }}>
            API_KEY missing
        </div>
      )}
    </main>
  );
};

export default App;