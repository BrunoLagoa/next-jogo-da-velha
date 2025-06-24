"use client";

import { useEffect } from 'react';
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
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
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