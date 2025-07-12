<template>
  <div class="shadow-md rounded-xl p-6 space-y-4 border">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">
          Name der Nation
        </label>
        <input
          v-model="nation.name"
          type="text"
          maxlength="32"
          class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          :placeholder="`Nation #${nation.number}`">
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">
          Vize
        </label>
        <select
          v-model="selectedViceId"
          class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        >
          <option :value="null" disabled>Wähle einen Vize aus</option>
          <option
            v-for="player in viceCandidates"
            :key="player.id"
            :value="player.id"
          >
            {{ player.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Herrscher Botschaft</label>
        <textarea
          v-model="nation.leaderMessage"
          maxlength="1000"
          class="w-full border border-gray-300 rounded-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          rows="4"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Diplomatie Botschaft</label>
        <textarea
          v-model="nation.diplomacyMessage"
          maxlength="1000"
          class="w-full border border-gray-300 rounded-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          rows="4"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Nationsbeschreibung</label>
        <textarea
          v-model="nation.description"
          maxlength="1000"
          class="w-full border border-gray-300 rounded-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          rows="4"
        />
      </div>

      <div class="w-full text-center">
        <button
          v-if="nation && nation.players"
          class="px-4 py-2 text-white rounded bg-green-600 hover:bg-green-800 cursor-pointer"
          @click="saveNationPrefs"
        >
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { fetchFromApi } from '@/utils/fetch'
import router from '@/router'

const props = defineProps<{
  nation: Nation
}>()

const selectedViceId = ref<number | null>(null)

watchEffect(() => {
  if (props.nation.viceLeader) {
    selectedViceId.value = props.nation.viceLeader.id
  }
})

watch(selectedViceId, (newId) => {
  const player = props.nation.players.find(p => p.id === newId) || null
  props.nation.viceLeader = player
})

const viceCandidates = computed(() => {
  return props.nation.players.filter(
    (player) => player.id !== props.nation.leader?.id
  )
})

async function saveNationPrefs() {
  if (!props.nation) return;

  const body = props.nation

  try {
    await fetchFromApi<Nation>(`/nations/${props.nation.id}`, {
      method: 'PATCH',
      body,
    })

    router.push(`/nation`)
  } catch (error) {
    console.log("Fehler beim Speichern der Nationseinstellungen:", error)
  }
}
</script>
