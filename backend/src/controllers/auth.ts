// src/controllers/auth.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByname, findUserByEmail, createUser } from '../models/user';
import { LoginRequest, RegisterRequest, JwtPayload, ApiResponse, LoginResponse, Token } from '../types';

export async function login(req: Request, res: Response): Promise<void> {
  const { username, password }: LoginRequest = req.body;

  try {
    const user = await findUserByname(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, message: 'Ungültiger Benutzername oder Passwort' });
      return;
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    const token: Token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    const response: ApiResponse<LoginResponse> = {
      success: true,
      data: {
        token,
        user: { id: user.id, username: user.username, email: user.email }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Serverfehler beim Login' });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password }: RegisterRequest = req.body;

  try {
    if (await findUserByname(username)) {
      res.status(400).json({ success: false, message: 'Benutzername existiert bereits' });
      return;
    }

    if (await findUserByEmail(email)) {
      res.status(400).json({ success: false, message: 'E-Mail bereits registriert' });
      return;
    }

    const newUser = await createUser({ username, email, password });

    const payload: JwtPayload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
    const token: Token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    const response: ApiResponse<LoginResponse> = {
      success: true,
      message: 'Registrierung erfolgreich',
      data: {
        token,
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Serverfehler bei der Registrierung' });
  }
}
