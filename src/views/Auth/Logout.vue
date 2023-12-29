<template>
  <div class="game-content">
    <h1>Logout</h1>
    <p>Du bist ausgeloggt!</p>
    <RouterLink to="/login">Neuer Login</RouterLink>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.logout()
</script>
