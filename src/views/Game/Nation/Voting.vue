<template>
  <h1 class="text-center">Herrscher wählen</h1>
  <p v-if="responseMsg" class="text-center mt-2">{{responseMsg}}</p>
  <div class="flex justify-center mt-4">
    <table v-if="nation && nation.players" class="min-w-max rounded shadow text-sm">
      <thead>
        <tr>
          <th class="px-2 py-1 ">Name</th>
          <th class="px-2 py-1 ">Dörfer</th>
          <th class="px-2 py-1 ">Bevölkerung</th>
          <th class="px-2 py-1 ">Deine Stimme</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in nation.players" :key="player.id">
          <td v-if="nation.leader && nation.leader.id === player.id" class="px-2 py-1 text-center text-blue-900 font-bold">{{ player.name }}</td>
          <td v-else class="px-2 py-1 text-center">{{ player.name }}</td>
          <td class="px-2 py-1 text-center">{{ player.countOfVillages }}</td>
          <td class="px-2 py-1 text-center">{{ player.population }}</td>
          <td class="px-2 py-1 text-center">
            <input
              type="radio"
              name="vote"
              :value="player"
              v-model="selectedPlayer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center mt-4">
    <button
        v-if="nation && nation.players"
        :class="[
          'px-4 py-2 text-white rounded',
          selectedPlayer ? 'bg-green-600 hover:bg-green-800 cursor-pointer' : 'bg-green-400 cursor-not-allowed'
        ]"
        :disabled="!selectedPlayer"
        @click="vote">
        Abstimmen
    </button>
  </div>
  
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { fetchFromApi } from '@/utils/fetch'

const userStore = useUserStore()


const nation = ref<Nation | null>(null)
const responseMsg = ref<string | null>(null)

async function loadNation() {
  const nationParam = userStore.me?.player?.nation?.id
  if (nationParam) {
    nation.value = await fetchFromApi<Nation>(`/nations/${nationParam}`)
  }
}

onMounted(loadNation)

const selectedPlayer = ref<any>(null)

async function vote() {
  if (!selectedPlayer.value || !nation.value) return;
  
  const body: LeaderVoting = {
    id: null,
    voteBy: userStore.me?.player?.id!,
    voteFor: selectedPlayer.value.id,
    nationId: nation.value?.id!
  }

  try {
    nation.value = await fetchFromApi<Nation>(`/nations/${nation.value.id}/leader-voting`, {
      method: 'PUT',
      body,
    })

    responseMsg.value = "Stimme geändert"
    window.dispatchEvent(new CustomEvent('reload-nation'))
  } catch (error) {
    responseMsg.value = "Stimme konnte nicht geändert werden"
  }
}
</script>
