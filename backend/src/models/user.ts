// src/models/user.ts
import { User, UserCreateInput, Username, UserId, Email } from "../types";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";

/**
 * Sucht einen Benutzer anhand des Benutzernamens
 */
export async function findUserByname(username: Username): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
}

/**
 * Sucht einen Benutzer anhande der E-Mail-Adresse
 */
export async function findUserByEmail(email: Email): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
}

/**
 * Sucht einen Benutzer anhand der ID
 */
export async function findUserById(id: UserId): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
}

/**
 * Erstellt einen neuen Benutzer (mit gehashtem Passwort)
 */
export async function createUser(data: UserCreateInput): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    return prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword
        }
    });
}