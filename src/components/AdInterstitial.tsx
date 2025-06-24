"use client";

import { useState, useEffect } from 'react';
import { AD_CONFIG } from '@/types/adTypes';

interface AdInterstitialProps {
  show: boolean;
  onClose: () => void;
  delaySeconds?: number;
}

const AdInterstitial: React.FC<AdInterstitialProps> = ({
  show,
  onClose,
  delaySeconds = 5
}) => {
  const [countdown, setCountdown] = useState(delaySeconds);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (show) {
      setCountdown(delaySeconds);
      setCanClose(false);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Inicializar AdSense para este anúncio
      setTimeout(() => {
        try {
          if (typeof window !== "undefined" && window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.error("AdSense error:", error);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [show, delaySeconds]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        {/* Botão de fechar (só aparece após o countdown) */}
        {canClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold"
          >
            ×
          </button>
        )}
        
        {/* Countdown */}
        {!canClose && (
          <div className="text-center mb-4">
            <p className="text-gray-600">Fechará em {countdown}s</p>
          </div>
        )}
        
        {/* Área do anúncio */}
        <div className="text-center">
          <div className="bg-gray-100 rounded p-4">
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "320px", height: "250px" }}
              data-ad-client={AD_CONFIG.publisherId}
              data-ad-slot={AD_CONFIG.slots.interstitial}
              data-ad-format="rectangle"
            ></ins>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Publicidade • Ajuda a manter o jogo gratuito
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdInterstitial; 