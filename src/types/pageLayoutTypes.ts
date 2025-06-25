import { ReactNode } from 'react';

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface GameTitleProps {
  className?: string;
  children?: string;
}

export interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
} 