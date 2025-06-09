<template>
  <div v-if="authStore.isLoggedIn" class="main-grid">
    <Main></Main>
    <Toaster></Toaster>
  </div>
  <div v-else>
    <div class="landing">
      <LandingPage></LandingPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import LandingPage from '@/views/LandingPage.vue'
import Main from '@/views/Game/Main.vue'
import { useAuthStore } from '@/stores/auth'
import { Toaster } from '@/components/ui/sonner'
const authStore = useAuthStore()
</script>
