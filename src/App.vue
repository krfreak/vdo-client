<template>
  <div v-if="authStore.token !== null" class="main-grid">
    <Main></Main>
    <Toaster></Toaster>
  </div>
  <div v-else>
    <div class="landing">
      <LandingPage></LandingPage>
    </div>
  </div>
  <footer id="footer">
    <RouterLink class="nav-link" to="/impressum">Impressum</RouterLink>
    <RouterLink class="nav-link" to="/privacy">Datenschutz</RouterLink>
  </footer>
</template>

<script setup lang="ts">
import LandingPage from '@/views/LandingPage.vue'
import Main from '@/views/Game/Main.vue'
import { useAuthStore } from '@/stores/auth'
import { Toaster } from '@/components/ui'
const authStore = useAuthStore()
</script>
