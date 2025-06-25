export interface PlayerFormProps {
  onStart: (playerX: string, playerO: string) => void;
}

export interface PlayerNameFormProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  handleNameSubmit: (e: React.FormEvent) => void;
  maxLength: number;
}