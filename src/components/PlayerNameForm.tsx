"use client";

import { PlayerNameFormProps } from '@/types/playerFormTypes';

export default function PlayerNameForm({ 
  playerName, 
  setPlayerName, 
  handleNameSubmit, 
  maxLength 
}: PlayerNameFormProps) {
  return (
    <form onSubmit={handleNameSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={maxLength}
          placeholder="Digite seu nome"
          className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={!playerName.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar
        </button>
      </div>
      <p className="text-xs text-gray-400 px-1 mt-1">{playerName.length}/{maxLength} caracteres</p>
    </form>
  );
} 