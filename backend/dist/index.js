"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
// .env laden
dotenv_1.default.config();
// Express-App initialisieren
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "3000", 10);
// Middlewares
app.use((0, cors_1.default)()); // CORS aktivieren / Erlaubt Zugriff vom Frontend
app.use(body_parser_1.default.json()); // JSON-Parsing für den Request-Body
app.use(body_parser_1.default.urlencoded({ extended: true })); // URL-encoded Parsing für den Request-Body
// API-Routen
app.use("/api/auth", auth_1.default); // Authentifizierungs-Routen / Login
app.use("/api/user", user_1.default); // Benutzer-Routen / Profil-Zugriff
// Healthcheck (optional)
app.get('/', (_req, res) => {
    res.json({ message: "Willkommen zur Express_API" });
});
// Server starten
app.listen(PORT, () => {
    console.log("Server läuft auf Port ${PORT}");
});
