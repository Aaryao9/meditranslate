import React from 'react';
import { Activity } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  return (
    <div className={`flex items-center gap-2 font-bold ${sizeClasses[size]}`}>
      <div className="p-1.5 rounded-lg bg-primary">
        <Activity className="text-primary-foreground" size={iconSizes[size]} />
      </div>
      <span className="text-foreground">
        Medi<span className="text-primary">Translate</span>
      </span>
    </div>
  );
};

export default Logo;
