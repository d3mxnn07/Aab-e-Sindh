import React from 'react';
import { Droplets } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withGlow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  withGlow = true,
}) => {
  const sizeMap = {
    sm: { container: 'w-5 h-5', icon: 'w-3 h-3' },
    md: { container: 'w-6 h-6', icon: 'w-3.5 h-3.5' },
    lg: { container: 'w-8 h-8', icon: 'w-5 h-5' },
    xl: { container: 'w-10 h-10', icon: 'w-6 h-6' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-[#800020] via-[#9b111e] to-[#e11d48] flex items-center justify-center shrink-0 transition-transform ${
        withGlow ? 'shadow-[0_0_15px_rgba(225,29,72,0.5)]' : ''
      } ${currentSize.container} ${className}`}
    >
      <Droplets className={`${currentSize.icon} text-white fill-current`} />
    </div>
  );
};
