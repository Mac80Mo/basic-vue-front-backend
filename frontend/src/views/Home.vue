<template>
    <div>
      <h1>Willkommen zu unserer Anwendung</h1>
      <p>Dies ist eine Demo-Anwendung mit Express.js, TypeScript und Vue3.</p>
  
      <div v-if="!isAuthenticated">
        <router-link to="/login">Zum Login</router-link>
      </div>
      <div v-else>
        <router-link to="/profile">Zum Profil</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useAuthStore } from '../stores/auth'
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  </script>
  