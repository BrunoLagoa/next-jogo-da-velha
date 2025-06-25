"use client";

import { SectionTitleProps } from '@/types/pageLayoutTypes';

export default function SectionTitle({ 
  children, 
  className = "", 
  gradient = false,
  gradientFrom = "from-blue-400",
  gradientTo = "to-purple-500"
}: SectionTitleProps) {
  const baseClass = "text-2xl font-bold mb-4";
  const gradientClass = gradient 
    ? `bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}` 
    : "";
  
  return (
    <h2 className={`${baseClass} ${gradientClass} ${className}`}>
      {children}
    </h2>
  );
} 