export interface PlayerSession {
  id: string;
  name: string;
  role?: 'X' | 'O';
}

export const authService = {
  createSession: async (playerName: string): Promise<PlayerSession> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName })
    });

    if (!response.ok) {
      throw new Error('Failed to create session');
    }

    return response.json();
  },

  getSession: async (): Promise<PlayerSession | null> => {
    const response = await fetch('/api/auth');
    if (!response.ok) return null;
    return response.json();
  },

  updateSession: async (session: PlayerSession): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session)
    });

    if (!response.ok) {
      throw new Error('Failed to update session');
    }
  },

  clearSession: async (): Promise<void> => {
    await fetch('/api/auth', { method: 'DELETE' });
  }
};