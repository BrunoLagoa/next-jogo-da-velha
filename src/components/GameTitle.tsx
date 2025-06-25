"use client";

import { GameTitleProps } from '@/types/pageLayoutTypes';

export default function GameTitle({ className = "", children = "Jogo da Velha" }: GameTitleProps) {
  return (
    <h1 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 ${className}`}>
      {children}
    </h1>
  );
} 