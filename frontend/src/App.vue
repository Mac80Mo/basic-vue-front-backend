<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <template v-if="!authStore.isAuthenticated">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Registrieren</router-link>
    </template>
    <template v-else>
      <router-link to="/profile">Profil</router-link> |
      <a href="#" @click.prevent="handleLogout">Abmelden</a>
    </template>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.ts'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
