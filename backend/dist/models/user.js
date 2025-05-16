"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByname = findUserByname;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.createUser = createUser;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Sucht einen Benutzer anhand des Benutzernamens
 */
async function findUserByname(username) {
    return prisma_1.default.user.findUnique({ where: { username } });
}
/**
 * Sucht einen Benutzer anhande der E-Mail-Adresse
 */
async function findUserByEmail(email) {
    return prisma_1.default.user.findUnique({ where: { email } });
}
/**
 * Sucht einen Benutzer anhand der ID
 */
async function findUserById(id) {
    return prisma_1.default.user.findUnique({ where: { id } });
}
/**
 * Erstellt einen neuen Benutzer (mit gehashtem Passwort)
 */
async function createUser(data) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(data.password, saltRounds);
    return prisma_1.default.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword
        }
    });
}
