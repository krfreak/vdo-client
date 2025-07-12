<template>
  <div class="shadow-md rounded-xl p-6 space-y-6 border w-full max-w-xl">
    <h2 class="text-xl font-semibold text-center">Verbannungsantrag stellen</h2>

    <div class="w-full">
      <label class="block text-sm font-medium mb-1">
          Spieler auswählen
        </label>
        <select
          v-model="selectedPlayerId"
          class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        >
          <option :value="null" disabled>Wähle einen Vize aus</option>
          <option
            v-for="player in bannablePlayers"
            :key="player.id"
            :value="player.id"
          >
            {{ player.name }}
          </option>
        </select>
    </div>

    <div class="w-full">
      <label class="block text-sm font-medium mb-1">Grund für die Verbannung</label>
        <textarea
          v-model="reason"
          maxlength="1000"
          class="w-full border border-gray-300 rounded-lg p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          rows="4"
        />
    </div>

    <div class="w-full text-center">
      <button
        @click="submitBanRequest"
        :disabled="!selectedPlayerId || !reason"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer"
      >
        Antrag absenden
      </button>
    </div>

    <p v-if="successMessage" class="text-green-600 text-sm text-center">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-red-600 text-sm text-center">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { fetchFromApi } from '@/utils/fetch'

const props = defineProps<{
  nation: Nation
}>()

const selectedPlayerId = ref('')
const reason = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const bannablePlayers = computed(() => {
  return props.nation.players.filter(
    (player) => player.id !== props.nation.leader?.id
  )
})

async function submitBanRequest() {
    
}
</script>
