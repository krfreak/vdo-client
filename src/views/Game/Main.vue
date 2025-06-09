<template>
  <header>
    <NavigationSidebar />
  </header>
  <div class="main-content">
    <div class="header">
      <ResourceHeader />
    </div>
    <div class="content">
      <RouterView />
    </div>
    <footer></footer>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationSidebar from '@/components/navigation/NavigationSidebar.vue'
import ResourceHeader from '@/components/header/ResourceHeader.vue'
</script>

<style></style>
