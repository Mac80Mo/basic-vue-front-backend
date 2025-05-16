"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/prisma.ts
const client_1 = require("@prisma/client");
// Erstellt eine Singleton-Instanz des PrismaClient für die Datenbankverbindung
const prisma = new client_1.PrismaClient();
// PrismaClient wird exportiert, um in anderen Teilen der Anwendung verwendet zu werden
exports.default = prisma;
