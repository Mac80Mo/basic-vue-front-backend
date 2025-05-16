"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await (0, user_1.findUserByname)(username);
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ success: false, message: 'Ungültiger Benutzername oder Passwort' });
            return;
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' });
        const response = {
            success: true,
            data: {
                token,
                user: { id: user.id, username: user.username, email: user.email }
            }
        };
        res.json(response);
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Serverfehler beim Login' });
    }
}
async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        if (await (0, user_1.findUserByname)(username)) {
            res.status(400).json({ success: false, message: 'Benutzername existiert bereits' });
            return;
        }
        if (await (0, user_1.findUserByEmail)(email)) {
            res.status(400).json({ success: false, message: 'E-Mail bereits registriert' });
            return;
        }
        const newUser = await (0, user_1.createUser)({ username, email, password });
        const payload = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' });
        const response = {
            success: true,
            message: 'Registrierung erfolgreich',
            data: {
                token,
                user: { id: newUser.id, username: newUser.username, email: newUser.email }
            }
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Serverfehler bei der Registrierung' });
    }
}
