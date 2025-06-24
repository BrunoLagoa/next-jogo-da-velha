"use client";

import { useState, useEffect, useCallback } from 'react';
import { AD_PLACEMENTS, AdPlacement } from '@/types/adTypes';

export const useAds = () => {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [lastInterstitialGame, setLastInterstitialGame] = useState(0);

  // Carrega dados do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGames = localStorage.getItem('gamesPlayed');
      const savedLastInterstitial = localStorage.getItem('lastInterstitialGame');
      
      if (savedGames) setGamesPlayed(parseInt(savedGames, 10));
      if (savedLastInterstitial) setLastInterstitialGame(parseInt(savedLastInterstitial, 10));
    }
  }, []);

  // Salva dados no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gamesPlayed', gamesPlayed.toString());
      localStorage.setItem('lastInterstitialGame', lastInterstitialGame.toString());
    }
  }, [gamesPlayed, lastInterstitialGame]);

  // Incrementa contador de jogos
  const incrementGameCount = useCallback(() => {
    setGamesPlayed(prev => prev + 1);
  }, []);

  // Verifica se deve mostrar intersticial
  const checkShouldShowInterstitial = useCallback(() => {
    const interstitialPlacement = AD_PLACEMENTS.find(
      (placement: AdPlacement) => placement.type === 'interstitial' && placement.enabled
    );
    
    if (!interstitialPlacement || !interstitialPlacement.frequency) return false;
    
    const gamesSinceLastAd = gamesPlayed - lastInterstitialGame;
    return gamesSinceLastAd >= interstitialPlacement.frequency;
  }, [gamesPlayed, lastInterstitialGame]);

  // Mostra intersticial se necessário
  const maybeShowInterstitial = useCallback(() => {
    if (checkShouldShowInterstitial()) {
      setShowInterstitial(true);
      setLastInterstitialGame(gamesPlayed);
    }
  }, [checkShouldShowInterstitial, gamesPlayed]);

  // Fecha intersticial
  const closeInterstitial = useCallback(() => {
    setShowInterstitial(false);
  }, []);

  // Verifica se um anúncio está habilitado
  const isAdEnabled = useCallback((placementId: string) => {
    const placement = AD_PLACEMENTS.find(p => p.id === placementId);
    return placement?.enabled || false;
  }, []);

  // Hook para quando um jogo termina
  const onGameEnd = useCallback(() => {
    incrementGameCount();
    // Pequeno delay para melhor UX
    setTimeout(() => {
      maybeShowInterstitial();
    }, 1000);
  }, [incrementGameCount, maybeShowInterstitial]);

  return {
    gamesPlayed,
    showInterstitial,
    isAdEnabled,
    onGameEnd,
    closeInterstitial,
    incrementGameCount,
    maybeShowInterstitial
  };
};

export default useAds; 