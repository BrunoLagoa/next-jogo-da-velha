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
    try {
      const response = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update session: ${response.status} - ${errorData || response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  },

  clearSession: async (): Promise<void> => {
    await fetch('/api/auth', { method: 'DELETE' });
  }
};