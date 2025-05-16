"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.ts
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
/**
 * GET /api/user/profile
 * Erfordert gültigen JWT – liefert Benutzerinfos zurück
 */
router.get('/profile', auth_1.verifyToken, async (req, res) => {
    if (!req.user) {
        res.status(401).json({ success: false, message: 'Nicht authentifiziert' });
        return;
    }
    try {
        const user = await (0, user_1.findUserById)(req.user.id);
        if (!user) {
            res.status(404).json({ success: false, message: 'Benutzer nicht gefunden' });
            return;
        }
        const response = {
            success: true,
            data: {
                username: user.username,
                email: user.email
            }
        };
        res.json(response);
    }
    catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ success: false, message: 'Serverfehler beim Laden des Profils' });
    }
});
exports.default = router;
