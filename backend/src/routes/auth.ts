// src/routes/auth.ts
import { Router } from 'express';
import { login, register } from '../controllers/auth';

// Neue Router-Instanz
const router = Router();

// Routen definieren
router.post('/login', login);         // POST /api/auth/login
router.post('/register', register);   // POST /api/auth/register

export default router;
