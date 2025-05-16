// src/types/index.ts
import { User as PrismaUser } from "@prisma/client";

// Grundlegende Alias-Typen
export type UserId = number;
export type Username = string;
export type Email = string;
export type Password = string;
export type Token = string;

// Reexportierter User-Typ von Prisma
export type User = PrismaUser;


// Interface für die Benutzerregistrierung
export interface UserCreateInput {
    username: Username;
    email: Email;
    password: Password;
}

// Login-Request-Datenstruktur
export interface LoginRequest {
    username: Username;
    password: Password;
}

// Registrierung-Request-Datenstruktur
export interface RegisterRequest {
    username: Username;
    email: Email;
    password: Password;
}

// Login-Antwort
export interface LoginResponse {
    token: Token;
    user: {
        id: UserId;
        username: Username;
        email: Email;
    };
}

// JWT Payload (was im Token gespeichert ist)
export interface JwtPayload {
    id: UserId;
    username: Username;
    email: Email;
    iat?: number; // Issued at
    exp?: number; // Expiration time
}

// Generisches API-Antwortformat
export interface ApiResponse<T> {
    success: boolean;
    data?: T; // Optional, wenn erfolgreich
    message?: string; // Optional, wenn ein Fehler aufgetreten ist
    errors?: string[]; // Optional, wenn mehrere Fehler aufgetreten sind
}

// Erweiterung von Express Request für die Middleware
declare global {
    namespace Express {  
        interface Request {
            user?: JwtPayload;
        }
    }
}