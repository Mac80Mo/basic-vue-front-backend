// src/routes/user.ts
import { Router, Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';
import { findUserById } from '../models/user';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/user/profile
 * Erfordert gültigen JWT – liefert Benutzerinfos zurück
 */
router.get('/profile', verifyToken, async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Nicht authentifiziert' });
    return;
  }

  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'Benutzer nicht gefunden' });
      return;
    }

    const response: ApiResponse<{ username: string; email: string }> = {
      success: true,
      data: {
        username: user.username,
        email: user.email
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ success: false, message: 'Serverfehler beim Laden des Profils' });
  }
});

export default router;
