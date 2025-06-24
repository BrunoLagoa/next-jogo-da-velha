"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onCloseRef = useRef(onClose);

  // Atualiza a referência do onClose
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Função estável para fechar
  const handleAutoClose = useCallback(() => {
    onCloseRef.current();
  }, []);

  useEffect(() => {
    // Limpa timer anterior
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (show) {
      setCountdown(delaySeconds);
      setCanClose(false);
      
      // Timer único que controla countdown e auto-fechamento
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanClose(true);
            // Fechar automaticamente após mostrar que pode fechar
            setTimeout(() => {
              handleAutoClose();
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Timer de segurança para fechar após tempo total (delaySeconds + 2s)
      const safetyTimer = setTimeout(() => {
        handleAutoClose();
      }, (delaySeconds + 2) * 1000);

      // Inicializar AdSense para este anúncio
      const adSenseTimer = setTimeout(() => {
        try {
          if (typeof window !== "undefined" && window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.error("AdSense error:", error);
        }
      }, 100);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        clearTimeout(safetyTimer);
        clearTimeout(adSenseTimer);
      };
    } else {
      // Reset estados quando não está mostrando
      setCountdown(delaySeconds);
      setCanClose(false);
    }
  }, [show, delaySeconds, handleAutoClose]);

  const handleManualClose = useCallback(() => {
    // Limpa o timer se o usuário fechar manualmente
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onCloseRef.current();
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative shadow-2xl">
        {/* Botão de fechar (só aparece após o countdown) */}
        {canClose && (
          <button
            onClick={handleManualClose}
            className="absolute top-2 right-2 w-8 h-8 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center text-gray-600 font-bold transition-colors"
            title="Fechar anúncio"
          >
            ×
          </button>
        )}
        
        {/* Countdown */}
        {!canClose && (
          <div className="text-center mb-4">
            <p className="text-gray-600">Fechará automaticamente em {countdown}s</p>
          </div>
        )}

        {/* Mensagem quando pode fechar */}
        {canClose && (
          <div className="text-center mb-4">
            <p className="text-green-600 text-sm">Fechando automaticamente em 2s ou clique no ×</p>
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