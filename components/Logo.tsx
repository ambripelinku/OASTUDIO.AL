import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* 
        Brand Symbol: "Origin Architecture Studio"
        Concept: The union of 'O' (Origin) and 'A' (Apex/Architecture).
        
        1. Outer Circle: Represents the 'O', the holistic space, the world.
        2. Inner Chevron/Dot: Represents the 'A', the structure, the focal point.
      */}
      
      {/* Outer Ring (O) */}
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="6" />
      
      {/* The A Structure (Abstract Chevron) */}
      <path 
        d="M50 25 L70 65 H30 L50 25Z" 
        stroke={color} 
        strokeWidth="6" 
        strokeLinejoin="round" 
        fill="none"
        opacity="0.3" 
      />
      
      {/* The Origin Dot (Reinforces the A, creates the focus) */}
      <circle cx="50" cy="65" r="5" fill={color} />
      
      {/* Stylized solid 'A' top */}
      <path d="M50 25 L60 45 H40 L50 25Z" fill={color} />
    </svg>
  );
};

export default Logo;