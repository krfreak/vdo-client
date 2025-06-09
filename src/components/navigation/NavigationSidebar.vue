<template>
  <Sidebar collapsible="none" variant="sidebar" class="min-h-screen">
    <SidebarHeader>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Navigation</h2>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Allgemeines</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/events">Ereignisse</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/income">Einkommen</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Nation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/nation">Übersicht</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/nationforum">Nationsforum</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/supplies">Hilfslieferungen</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/diplomacy">Diplomatie</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/management">Management</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Truppen</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/recruiting">Einheiten</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/hero">Held</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/armies">Armeen</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/map">Landkarte</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupContent>
          <form @submit.prevent="" class="space-y-1">
            <FormField v-slot="{ componentField }" name="search">
              <FormItem class="grid grid-cols-6 gap-2 items-end">
                <FormControl>
                  <div class="col-span-5">
                    <Label for="searchbox">Suche</Label>
                    <Input
                      type="text"
                      id="searchbox"
                      class=""
                      placeholder="..."
                      v-bind="componentField"
                    />
                  </div>
                  <Button class="button col-span-1" type="submit">OK</Button>
                </FormControl>
              </FormItem>
            </FormField>
          </form>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/rankings">Rangliste</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/messaging">Briefe</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/forum">Forum</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/impressum">Impressum</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton as-child>
              <RouterLink class="nav-link" to="/privacy">Datenschutz</RouterLink>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroup,
  SidebarHeader
} from '@/components/ui/sidebar'
import SidebarGroupLabel from '../ui/sidebar/SidebarGroupLabel.vue'
import SidebarMenu from '../ui/sidebar/SidebarMenu.vue'

const authStore = useAuthStore()
const unfoldable = ref(true)
const visible = ref(true)
const overlaid = ref(true)
</script>
