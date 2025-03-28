"use client";

import { useState } from 'react';
import { PlayerFormProps } from '../types/playerFormTypes';

export default function PlayerForm({ onStart }: PlayerFormProps) {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [showForm, setShowForm] = useState(true);
  const maxLength = 30;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerX.trim() && playerO.trim()) {
      onStart(playerX, playerO);
      setShowForm(false);
    }
  };

  return showForm ? (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl space-y-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Nomes dos Jogadores
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Jogador X</label>
            <input
              type="text"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              maxLength={maxLength}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome do Jogador X"
              required
            />
            <p className="text-xs text-gray-400 px-1 mt-1">{playerX.length}/{maxLength} caracteres</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Jogador O</label>
            <input
              type="text"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              maxLength={maxLength}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome do Jogador O"
              required
            />
            <p className="text-xs text-gray-400 px-1 mt-1">{playerO.length}/{maxLength} caracteres</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Iniciar Jogo
        </button>
      </form>
    </div>
  ) : null;
}