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
import axios from 'axios'
import Activation from '@/components/activation/Activation.vue'

type Round = {
  id: number
  createdAt: string
  startedAt: string | null
  finishedAt: string | null
  active: boolean
}

type Player = {
  id: number
  name: string
}

const round = ref<Round | null>(null)
const player = ref<Player | null>(null)
const baseUrl = import.meta.env.VITE_VDGO_BASE_URL;

onMounted(async () => {
  round.value = await fetchActiveRound()
  player.value = await fetchPlayerForRound()
})

const state = computed(() => {
  if (!round.value) return 'waiting-for-new-round'
  if (round.value && round.value.finishedAt) return 'end-of-round'
  if (round.value && !player.value) return 'activate-for-new-round'
  return 'in-game'
})

async function fetchActiveRound(): Promise<Round | null> {
  try {
    const res = await axios.get(
      `${baseUrl}/rounds/active`,
      {
        withCredentials: true,
        headers: {
          Authorization: true
        }
      }
    );

    if (res.data && res.data.Id) {
      return res.data as Round;
    }
  } catch (error) {
    console.error(error)
  }
  return null
}
async function fetchPlayerForRound(): Promise<Player | null> {
  try {
    const res = await axios.get(
      `${baseUrl}/players/active-round/me`,
      {
        withCredentials: true,
        headers: {
          Authorization: true
        }
      }
    );

    console.log(res.data);
    if (res.data && res.data.id) {
      return res.data as Player;
    }
  } catch (error) {
    console.error(error)
  }
  return null
}
</script>