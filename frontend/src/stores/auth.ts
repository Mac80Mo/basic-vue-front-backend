// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import type { LoginRequest } from '../types'
import type { RegisterRequest } from '../types'
import type { ApiError } from '../types'
import { login as loginApi, register as registerApi, getProfile } from '../services/auth'


/**
 * Auth-Store zum zentralen Verwalten des Authentifizierungsstatus
 * Verwendet die Composition API mit Pinia
 */
export const useAuthStore = defineStore('auth', () => {
  // State - reaktive Variablen
  const token = ref<string | null>(localStorage.getItem('token'))  // Token aus localStorage laden
  const user = ref<User | null>(null)                              // Benutzerinformationen
  
  // Computed - berechnete Eigenschaften
  const isAuthenticated = computed<boolean>(() => !!token.value)   // Ist der Benutzer authentifiziert?
  
  // Actions - Methoden zum Ändern des State
  
  /**
   * Benutzer anmelden
   * @param credentials Benutzername und Passwort
   * @returns Promise<boolean> - true bei erfolgreicher Anmeldung
   * @throws ApiError bei fehlgeschlagener Anmeldung
   */
  async function login(credentials: LoginRequest): Promise<boolean> {
    try {
      const response = await loginApi(credentials)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('token', response.token)  // Token im Browser speichern
      return true
    } catch (error) {
      const apiError: ApiError = {
        message: (error as Error).message || 'Login fehlgeschlagen',
        status: (error as any)?.response?.status
      }
      throw apiError
    }
  }
  
  /**
   * Neuen Benutzer registrieren
   * @param userData Benutzername, E-Mail und Passwort
   * @returns Promise<boolean> - true bei erfolgreicher Registrierung
   * @throws ApiError bei fehlgeschlagener Registrierung
   */
  async function register(userData: RegisterRequest): Promise<boolean> {
    try {
      const response = await registerApi(userData)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('token', response.token)  // Token im Browser speichern
      return true
    } catch (error) {
      const apiError: ApiError = {
        message: (error as Error).message || 'Registrierung fehlgeschlagen',
        status: (error as any)?.response?.status
      }
      throw apiError
    }
  }
  
  /**
   * Benutzerprofil vom Server abrufen
   * @returns Promise mit Benutzerdaten
   * @throws ApiError bei fehlgeschlagenem Abruf des Profils
   */
  async function fetchUserProfile() {
    try {
      const userData = await getProfile()
      if (user.value) {
        // Bestehenden Benutzer aktualisieren
        user.value.username = userData.username
        user.value.email = userData.email
      } else {
        // Neuen Benutzer erstellen, wenn keiner existiert
        user.value = {
          id: 0, // ID setzen wir später wenn bekannt
          username: userData.username,
          email: userData.email
        }
      }
      return userData
    } catch (error) {
      const apiError: ApiError = {
        message: (error as Error).message || 'Fehler beim Laden des Profils',
        status: (error as any)?.response?.status
      }
      
      // Bei 401 Unauthorized automatisch ausloggen
      if (apiError.status === 401) {
        logout()
      }
      
      throw apiError
    }
  }
  
  /**
   * Benutzer abmelden und Authentifizierungsdaten löschen
   */
  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem('token')  // Token aus dem Browser entfernen
  }
  
  // Store-Objekt zurückgeben
  return {
    // State
    token,
    user,
    // Computed
    isAuthenticated,
    // Actions
    login,
    register,
    fetchUserProfile,
    logout
  }
})