"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
// Neue Router-Instanz
const router = (0, express_1.Router)();
// Routen definieren
router.post('/login', auth_1.login); // POST /api/auth/login
router.post('/register', auth_1.register); // POST /api/auth/register
exports.default = router;
