<template>
    <div>
      <h1>Registrierung</h1>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Benutzername:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="email">E-Mail:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Passwort:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirmPassword">Passwort bestätigen:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit" :disabled="isLoading || !isFormValid">
          {{ isLoading ? 'Registriere...' : 'Registrieren' }}
        </button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p>
        Bereits registriert? <router-link to="/login">Zum Login</router-link>
      </p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  import type { ApiError } from '../types/index'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  
  const isFormValid = computed(() =>
    username.value.length > 0 &&
    email.value.length > 0 &&
    password.value.length >= 6 &&
    password.value === confirmPassword.value
  )
  
  async function handleRegister() {
    if (!isFormValid.value) {
      error.value = 'Bitte überprüfe deine Eingaben'
      return
    }
  
    isLoading.value = true
    error.value = null
  
    try {
      await authStore.register({ username: username.value, email: email.value, password: password.value })
      router.push('/profile')
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message || 'Registrierung fehlgeschlagen'
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
  