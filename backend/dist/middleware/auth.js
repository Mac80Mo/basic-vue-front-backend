"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware zur Überprüfung des JWT-Tokens und Extraktion der Benutzerinformationen
*/
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Bearer <token>
    if (!token) {
        res.status(403).json({
            success: false,
            message: "Kein Token bereitgestellt!"
        });
        return;
    }
    try {
        const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded; // Der Benutzer hängt jetzt an der Request 
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Ungültiger Token!"
        });
    }
}
