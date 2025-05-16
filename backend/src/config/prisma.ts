// src/config/prisma.ts
import { PrismaClient } from "@prisma/client";

// Erstellt eine Singleton-Instanz des PrismaClient für die Datenbankverbindung
const prisma = new PrismaClient();

// PrismaClient wird exportiert, um in anderen Teilen der Anwendung verwendet zu werden
export default prisma;
