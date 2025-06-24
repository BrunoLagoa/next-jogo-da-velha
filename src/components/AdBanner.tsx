"use client";

import { useEffect, useRef } from 'react';
import { AD_CONFIG } from '@/types/adTypes';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  slot: string;
  width?: number;
  height?: number;
  format?: string;
  responsive?: boolean;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  slot,
  width = 728,
  height = 90,
  format = "auto",
  responsive = true,
  className = ""
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Evita dupla inicialização
    if (initializedRef.current) return;
    
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
          // Verifica se o elemento já tem anúncio
          const hasAd = adRef.current.querySelector('iframe') || 
                       adRef.current.getAttribute('data-adsbygoogle-status');
          
          if (!hasAd) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            initializedRef.current = true;
          }
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: responsive ? "100%" : `${width}px`,
          height: responsive ? "auto" : `${height}px`,
        }}
        data-ad-client={AD_CONFIG.publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

export default AdBanner; 