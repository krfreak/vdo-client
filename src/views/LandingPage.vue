<template>
  <div class="container">
    <img src="/images/loginbanner_plain.png" alt="Loginbanner" />
    <div v-if="authStore.isLoggedIn">
      <RouterLink to="/main" class="menu-item">Zum Spiel</RouterLink>
      <RouterLink to="/guide" class="menu-item">Anleitung</RouterLink>
      <RouterLink to="/forum" class="menu-item">Forum</RouterLink>
      <RouterLink to="/rankings" class="menu-item">Rangliste</RouterLink>
      <RouterLink to="/agb" class="menu-item">AGB</RouterLink>
      <RouterLink to="/impressum" class="menu-item">Impressum</RouterLink>
      <RouterLink to="/privacy" class="menu-item">Datenschutz</RouterLink>
    </div>
    <div v-else class="container-vertical">
      <Login></Login>
      <nav class="menu">
        <RouterLink to="/register" class="menu-item">Registrieren</RouterLink>
        <RouterLink to="/guide" class="menu-item">Anleitung</RouterLink>
        <RouterLink to="/forum" class="menu-item">Forum</RouterLink>
        <RouterLink to="/rankings" class="menu-item">Rangliste</RouterLink>
        <RouterLink to="/agb" class="menu-item">AGB</RouterLink>
        <RouterLink to="/impressum" class="menu-item">Impressum</RouterLink>
        <RouterLink to="/privacy" class="menu-item">Datenschutz</RouterLink>
      </nav>
    </div>
    <!-- <News></News> -->
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Login from './Auth/Login.vue'
const authStore = useAuthStore()
</script>
