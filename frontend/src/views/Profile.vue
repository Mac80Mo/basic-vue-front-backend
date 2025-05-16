<template>
  <div class="profile-container">
    <h1>👤 Profil</h1>

    <div v-if="loading">Lade Profildaten...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p><strong>Benutzername:</strong> {{ authStore.user?.username }}</p>
      <p><strong>E-Mail:</strong> {{ profileData?.email }}</p>

      <div class="progress-box">
        <h2>👋 Hallo {{ authStore.user?.username }}, willkommen zurück!</h2>

        <p>Du arbeitest an einem Fullstack-Projekt mit:</p>
        <ul>
          <li>✅ Express Backend (läuft!)</li>
          <li>✅ Auth mit JWT</li>
          <li>✅ Vue 3 + Pinia + Vite</li>
          <li>🛠 Integration: läuft stabil</li>
        </ul>

        <div class="progress-bar-container">
          <p><strong>Fortschritt:</strong></p>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: 75%">75%</div>
          </div>
          <p>Frontend abgeschlossen: 75%</p>
        </div>

        <p><em>Zuletzt erledigt:</em> Login & geschützte Route</p>
        <p><em>Nächster Schritt:</em> Benutzerprofil dynamisch machen oder Styling verbessern</p>
      </div>
    </div>

    <button @click="handleLogout" class="logout-button">Abmelden</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { ProfileResponse, ApiError } from '@/types'

const authStore = useAuthStore()
const router = useRouter()

const profileData = ref<ProfileResponse | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await authStore.fetchUserProfile()
    profileData.value = data
  } catch (err) {
    const apiError = err as ApiError
    error.value = apiError.message
  } finally {
    loading.value = false
  }
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
  background-color: #f9f9f9;
}

.logout-button {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #d33;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #b00;
}

.progress-box {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}

.progress-bar-container {
  margin: 1rem 0;
}

.progress-bar {
  height: 20px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  background: #42b983;
  height: 100%;
  color: white;
  text-align: center;
  line-height: 20px;
  font-size: 0.8rem;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
