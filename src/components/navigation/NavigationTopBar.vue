<template>
  <NavigationMenu class="text-white">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Allgemeines</NavigationMenuTrigger>
        <NavigationMenuContent
          class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
        >
          <NavigationMenuLink :as="RouterLink" to="/events">Ereignisse</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/income">Einkommen</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/castle">Schloss</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Nation</NavigationMenuTrigger>
        <NavigationMenuContent
          class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
        >
          <NavigationMenuLink :as="RouterLink" to="/nation">Übersicht</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/nationsforum">Nationsforum</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/supplies">Hilfslieferungen</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/diplomacy">Diplomatie</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/management">Management</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Truppen</NavigationMenuTrigger>
        <NavigationMenuContent
          class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
        >
          <NavigationMenuLink :as="RouterLink" to="/recruiting">Einheiten</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/hero">Held</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/armies">Armeen</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink :as="RouterLink" to="/map">Landkarte</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Sonstiges</NavigationMenuTrigger>
        <NavigationMenuContent
          class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
        >
          <NavigationMenuLink :as="RouterLink" to="/rankings">Rangliste</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/search">Suche</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/messages">Briefe</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/forum">Forum</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/guide">Hilfe</NavigationMenuLink>
          <NavigationMenuLink :as="RouterLink" to="/logout">Logout</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { RouterLink } from 'vue-router'
</script>

<style></style>
