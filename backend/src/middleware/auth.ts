// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, Token } from "../types";

/**
 * Middleware zur Überprüfung des JWT-Tokens und Extraktion der Benutzerinformationen
*/

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader: string | undefined = req.headers.authorization;
    const token: Token | undefined = authHeader?.split(" ")[1]; // Bearer <token>

    if (!token) {
        res.status(403).json({
            success: false,
            message: "Kein Token bereitgestellt!"
        });
        return;
    }

    try {
        const jwtSecret: string = process.env.JWT_SECRET || "fallback_secret";
        const decoded: JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload;
        req.user = decoded; // Der Benutzer hängt jetzt an der Request 
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Ungültiger Token!"
        });
    }
}