<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Benutzername:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Passwort:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Anmelden...' : 'Anmelden' }}
        </button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p>
        Noch kein Konto? <router-link to="/register">Jetzt registrieren</router-link>
      </p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  import type { ApiError } from '../types/index'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const username = ref('')
  const password = ref('')
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  
  async function handleLogin() {
    error.value = null
    isLoading.value = true
    try {
      await authStore.login({ username: username.value, password: password.value })
      router.push('/profile')
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message || 'Login fehlgeschlagen'
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  form {
    max-width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  div {
    margin-bottom: 15px;
  }
  </style>
  