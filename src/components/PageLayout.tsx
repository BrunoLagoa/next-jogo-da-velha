"use client";

import { PageLayoutProps } from '@/types/pageLayoutTypes';

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4 pb-16 gap-8 sm:p-8 sm:gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 to-gray-800 text-white ${className}`}>
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        {children}
      </main>
    </div>
  );
} 