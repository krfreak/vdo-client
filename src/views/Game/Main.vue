<template>
  <SidebarProvider class="min-h-full">
    <NavigationSidebar />
    <main class="p-3 w-full">
      <ResourceHeader />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import ResourceHeader from '@/components/header/ResourceHeader.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import NavigationSidebar from '@/components/navigation/NavigationSidebar.vue'
</script>

<style></style>
