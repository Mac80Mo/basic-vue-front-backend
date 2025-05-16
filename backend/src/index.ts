// src/index.ts
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
//import bodyParser from "body-parser";
import authRoutes from "./routes/auth"; // Authentifizierungs-Routen
import userRoutes from "./routes/user";

// .env laden
dotenv.config();

// Express-App initialisieren
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Middlewares
app.use(cors()); // CORS aktivieren / Erlaubt Zugriff vom Frontend
app.use(express.json()); // JSON-Parsing für den Request-Body
app.use(express.urlencoded({ extended: true })); // URL-encoded Parsing für den Request-Body

// API-Routen
app.use("/api/auth", authRoutes); // Authentifizierungs-Routen / Login
app.use("/api/user", userRoutes); // Benutzer-Routen / Profil-Zugriff

// Healthcheck (optional)
app.get('/', (_req: Request, res: Response): void => {
    res.json({ message: "Willkommen zur Express_API" });
});

// Server starten
app.listen(PORT, (): void => {
    console.log(`Server läuft auf Port ${PORT}`);
});
