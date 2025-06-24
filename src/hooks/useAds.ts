"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { AD_PLACEMENTS, AdPlacement } from '@/types/adTypes';
import { pusherService } from '@/services/pusherService';
import { authService } from '@/services/authService';

export const useAds = () => {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [lastInterstitialGame, setLastInterstitialGame] = useState(0);
  const gameEndProcessedRef = useRef<string | null>(null);
  const isPlayerXRef = useRef<boolean>(false);

  // Carrega dados do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGames = localStorage.getItem('gamesPlayed');
      const savedLastInterstitial = localStorage.getItem('lastInterstitialGame');
      
      if (savedGames) setGamesPlayed(parseInt(savedGames, 10));
      if (savedLastInterstitial) setLastInterstitialGame(parseInt(savedLastInterstitial, 10));
    }
  }, []);

  // Verifica se é jogador X para controlar anúncios
  useEffect(() => {
    const checkPlayerRole = async () => {
      try {
        const session = await authService.getSession();
        isPlayerXRef.current = session?.role === 'X';
        console.log('useAds - Role do jogador:', session?.role, 'É jogador X:', isPlayerXRef.current);
      } catch (error) {
        console.error('Erro ao verificar role do jogador:', error);
      }
    };
    
    checkPlayerRole();
  }, []);

  // Escuta eventos de anúncios via Pusher
  useEffect(() => {
    const unsubscribe = pusherService.onUpdate((update) => {
      if (update.type === 'AD_SHOW_INTERSTITIAL') {
        console.log('useAds - Recebido comando para mostrar anúncio via Pusher');
        setShowInterstitial(true);
      } else if (update.type === 'AD_CLOSE_INTERSTITIAL') {
        console.log('useAds - Recebido comando para fechar anúncio via Pusher');
        setShowInterstitial(false);
      }
    });
    
    return () => unsubscribe();
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

  // Verifica se o anúncio intersticial está habilitado
  const isInterstitialEnabled = useCallback(() => {
    const interstitialPlacement = AD_PLACEMENTS.find(
      (placement: AdPlacement) => placement.type === 'interstitial' && placement.enabled
    );
    
    const enabled = interstitialPlacement?.enabled || false;
    console.log('useAds - Anúncio intersticial habilitado:', enabled);
    return enabled;
  }, []);

  // Mostra intersticial para todos os jogadores
  const showInterstitialAd = useCallback(() => {
    console.log('useAds - showInterstitialAd chamado, jogador X:', isPlayerXRef.current);
    
    if (!isInterstitialEnabled()) {
      console.log('useAds - Anúncio intersticial desabilitado');
      return;
    }

    // Se for jogador X, envia comando via Pusher para sincronizar
    if (isPlayerXRef.current) {
      console.log('useAds - Jogador X enviando comando via Pusher');
      pusherService.sendUpdate({
        type: 'AD_SHOW_INTERSTITIAL',
        timestamp: Date.now()
      });
    }
    
    // Ambos os jogadores mostram o anúncio localmente
    console.log('useAds - Mostrando anúncio intersticial localmente');
    setShowInterstitial(true);
    setLastInterstitialGame(gamesPlayed);
  }, [isInterstitialEnabled, gamesPlayed]);

  // Fecha intersticial para todos os jogadores
  const closeInterstitial = useCallback(() => {
    console.log('useAds - closeInterstitial chamado');
    
    // Envia evento via Pusher para sincronizar fechamento
    pusherService.sendUpdate({
      type: 'AD_CLOSE_INTERSTITIAL',
      timestamp: Date.now()
    });
    
    setShowInterstitial(false);
  }, []);

  // Verifica se um anúncio está habilitado
  const isAdEnabled = useCallback((placementId: string) => {
    const placement = AD_PLACEMENTS.find(p => p.id === placementId);
    return placement?.enabled || false;
  }, []);

  // Hook para quando um jogo termina - sempre mostra anúncio
  const onGameEnd = useCallback((gameId?: string) => {
    const currentGameId = gameId || Date.now().toString();
    
    // Evita processar o mesmo jogo múltiplas vezes
    if (gameEndProcessedRef.current === currentGameId) {
      console.log('useAds - Jogo já processado, ignorando:', currentGameId);
      return;
    }
    
    console.log('useAds - Fim de jogo detectado:', currentGameId);
    gameEndProcessedRef.current = currentGameId;
    
    incrementGameCount();
    
    // Pequeno delay para melhor UX, depois sempre mostra o anúncio
    setTimeout(() => {
      showInterstitialAd();
    }, 1000);
  }, [incrementGameCount, showInterstitialAd]);

  // Reset do controle quando um novo jogo começa
  const onGameStart = useCallback(() => {
    console.log('useAds - Novo jogo iniciado, resetando controle');
    gameEndProcessedRef.current = null;
  }, []);

  return {
    gamesPlayed,
    showInterstitial,
    isAdEnabled,
    onGameEnd,
    onGameStart,
    closeInterstitial,
    incrementGameCount,
    maybeShowInterstitial: showInterstitialAd
  };
};

export default useAds; 