<template>
  <aside v-if="authStore.token" class="menu m-2">
    <p class="menu-label">Allgemeines</p>
    <ul class="menu-list">
      <li>
        <RouterLink class="nav-link" to="/events">Ereignisse</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/income">Einkommen</RouterLink>
      </li>
    </ul>
    <RouterLink class="nav-link" to="/castle">Schloss</RouterLink>

    <p class="menu-label">Nation</p>
    <ul class="menu-list">
      <li>
        <RouterLink class="nav-link" to="/nation">Übersicht</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/nationforum">Nationsforum</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/supplies">Hilfslieferungen</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/diplomacy">Diplomatie</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/management">Management</RouterLink>
      </li>
    </ul>
    <p class="menu-label">Truppen</p>
    <ul class="menu-list">
      <li>
        <RouterLink class="nav-link" to="/recruiting">Einheiten</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/hero">Held</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link" to="/armies">Armeen</RouterLink>
      </li>
    </ul>

    <RouterLink class="nav-link" to="/map">Landkarte</RouterLink>
    <br />
    <div class="searchbar">
      <form @submit.prevent="" class="w-1/6 space-y-1">
        <FormField v-slot="{ componentField }" name="search">
          <FormItem>
            <FormLabel>Suche</FormLabel>
            <FormControl>
              <Input type="text" class="w-5/6" placeholder="..." v-bind="componentField" /><Button
                class="button w-1/6"
                type="submit"
                >OK</Button
              >
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <br />
    </div>

    <RouterLink class="nav-link" to="/rankings">Rangliste</RouterLink>

    <RouterLink class="nav-link" to="/messaging">Briefe</RouterLink>

    <RouterLink class="nav-link" to="/forum">Forum</RouterLink>
    <br />
    <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
    <div class="sidebar-footer">
      <RouterLink class="nav-link" to="/impressum">Impressum</RouterLink>
      <RouterLink class="nav-link" to="/privacy">Datenschutz</RouterLink>
    </div>
  </aside>
  <aside v-if="!authStore.token" class="menu">
    <p class="menu-label"></p>
    <RouterLink class="nav-link" to="/login">Login</RouterLink>

    <div class="sidebar-footer">
      <RouterLink class="nav-link" to="/rankings">Rangliste</RouterLink>
      <RouterLink class="nav-link" to="/messaging">Briefe</RouterLink>

      <RouterLink class="nav-link" to="/forum">Forum</RouterLink>
      <br />
      <RouterLink class="nav-link" to="/impressum">Impressum</RouterLink>
      <RouterLink class="nav-link" to="/privacy">Datenschutz</RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import {
  Button,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useToast
} from '@/components/ui'
const authStore = useAuthStore()
const unfoldable = ref(true)
const visible = ref(true)
const overlaid = ref(true)
</script>
