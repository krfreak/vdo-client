<template>
  <div class="game-content">
    <div v-if="state === 'waiting-for-new-round'">
      <p>Warte auf Rundenstart...</p>
    </div>
    <div v-else-if="state === 'activate-for-new-round'">
      <Activation/>
    </div>
    <div v-else-if="state === 'in-game'">
       <h1>Ereignisse</h1>
    </div>
    <div v-else-if="state === 'end-of-round'">
      <p>Die Runde ist beendet, aber noch nicht geschlossen.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Activation from '@/components/activation/Activation.vue'
import { fetchFromApi } from '@/utils/fetch'

const round = ref<Round | null>(null)
const player = ref<Player | null>(null)

onMounted(async () => {
  round.value  = await fetchFromApi<Round>('/rounds/active')
  player.value  = await fetchFromApi<Player>('/players/active-round/me')
})

const state = computed(() => {
  if (!round.value) return 'waiting-for-new-round'
  if (round.value && round.value.finishedAt) return 'end-of-round'
  if (round.value && !player.value) return 'activate-for-new-round'
  return 'in-game'
})

</script>