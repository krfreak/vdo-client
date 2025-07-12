<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-center mb-8">Herrscher Optionen</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/2">
        <NationPreferencesCard v-if="nation" :nation="nation" />
      </div>

      <div class="w-full md:w-1/2 space-y-6">
        <NationImageUploadCard v-if="nation" :nation="nation" />
        <BanRequestCard v-if="nation" :nation="nation" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { fetchFromApi } from '@/utils/fetch'
import NationPreferencesCard from '@/components/nation/NationPreferencesCard.vue'
import NationImageUploadCard from '@/components/nation/NationImageUploadCard.vue'
import BanRequestCard from '@/components/nation/BanRequestCard.vue'

const userStore = useUserStore()
const nation = ref<Nation | null>(null)

async function loadNation() {
  const nationParam = userStore.me?.player?.nation?.id
  if (nationParam) {
    nation.value = await fetchFromApi<Nation>(`/nations/${nationParam}`)
  }
}

onMounted(loadNation)


</script>