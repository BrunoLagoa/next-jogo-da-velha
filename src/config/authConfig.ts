import { Secret } from 'jsonwebtoken';

export const authConfig = {
  jwtSecret: (process.env.JWT_SECRET || 'your-secret-key') as Secret,
  cookieName: 'game_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24 hours
  }
};