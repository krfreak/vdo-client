<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="flex flex-col items-center">
      <span class="text-center">Dieser Account ist für die neue Runde deaktiviert worden, die bald anfängt!</span>
      <span class="text-center">Du kannst wieder einer Nation deiner Wahl beitreten.</span>
    </div>
  </div>
  <br />
  <br />
  <div v-if="!selectedRaceId">
    <div class="flex items-center justify-center h-full w-full">
      <div class="flex flex-col items-center">
        <span class="text-center">Wähle deine Rasse</span>
        <span class="text-center">Die Rassen haben verschiedene Stärken und Schwächen.</span>
      </div>
    </div>
    <div class="flex items-center justify-center w-full mt-4">
      <div v-if="loading">
        Lädt...
      </div>
      <table v-else>
        <tbody>
          <tr v-for="race in activationOptions?.races || []" :key="race.id">
            <td class="px-2 py-1 text-center">
              <input
                type="radio"
                name="race"
                :value="race.id"
                v-model="selectedRaceId"
              />
            </td>
            <td class="px-2 py-1 text-center flex">
              <img
                v-if="race.imageUri"
                :src="race.imageUri"
                :alt="race.name"
                class="w-8 h-8 mr-2 inline-block"
              />
              {{ race.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="!selectedHeroId">
    <div class="flex items-center justify-center h-full w-full">
      <div class="flex flex-col items-center">
        <span class="text-center">Wähle deinen Helden</span>
        <span class="text-center">Mit der Auswahl deines Helden kannst du dich spezialisieren. Jeder Held gibt deiner Armee einen Bonus, der sich mit jedem Level steigert.</span>
        <button
          class="mt-4 px-4 py-2 bg-primary rounded hover:bg-red-800"
          @click="goBackToRaceSelection"
        >
          Zurück
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center w-full mt-4">
      <table>
        <tbody>
          <tr v-for="hero in heroesByRace || []" :key="hero.id">
            <td class="px-2 py-1 text-center">
              <input
                type="radio"
                name="hero"
                :value="hero.id"
                v-model="selectedHeroId"
              />
            </td>
            <td class="px-2 py-1 text-center">
              <img
                v-if="hero.imageUri"
                :src="hero.imageUri"
                :alt="hero.name"
                class="w-8 h-8 mr-2 inline-block"
              />
            </td>
            <td class="px-2 py-1 text-left">
              <div>
                <span class="font-semibold">{{ hero.name }}</span>
              </div>
              <div class="text-sm mt-1 flex flex-col">
                <span v-if="hero.attackBonus !== 1" class="mb-1">
                  Angriff: {{ formatBonusPercent(hero.attackBonus) }}
                </span>
                <span v-if="hero.defenseBonus !== 1" class="mb-1">
                  Verteidigung: {{ formatBonusPercent(hero.defenseBonus) }}
                </span>
                <span v-if="hero.healthBonus !== 1" class="mb-1">
                  Leben: {{ formatBonusPercent(hero.healthBonus) }}
                </span>
                <span v-if="hero.speedBonus !== 1">
                  Geschwindigkeit: {{ formatBonusPercent(hero.speedBonus) }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="selectedRaceId && selectedHeroId">
    <div class="flex items-center justify-center h-full w-full">
      <div class="flex flex-col items-center">
        <span class="text-center">Wähle deine Nation</span>
        <span class="text-center">Die Nation ist die Allianz, in der du spielst.</span>
        <button
          class="mt-4 px-4 py-2 bg-primary rounded hover:bg-red-800"
          @click="goBackToHeroSelection"
        >
          Zurück
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center w-full mt-4">
      <table>
        <tbody>
          <tr v-for="nation in activationOptions?.nations || []" :key="nation.id">
            <td class="px-2 py-1 text-center">
              <input
                type="radio"
                name="nation"
                :value="nation.id"
                v-model="selectedNationId"
              />
            </td>
            <td class="px-2 py-1">
              <span v-if="nation.name" class="font-semibold">{{ nation.name }} #{{ nation.number }} </span>
              <span v-else class="font-semibold">Nation #{{ nation.number }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center w-full mt-4">
      <button
        class="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded disabled:opacity-50"
        :disabled="!selectedNationId"
        @click="joinNation"
      >
        Beitreten
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_VDGO_BASE_URL;
const activationOptions = ref<ActivationOptions | null>(null)
const selectedRaceId = ref<number | null>(null)
const selectedHeroId = ref<number | null>(null)
const selectedNationId = ref<number | null>(null)
const loading = ref(true)

const heroesByRace = computed(() => {
  if (
    !activationOptions.value ||
    !activationOptions.value.heroes ||
    selectedRaceId.value === null
  ) {
    return null
  }
  return activationOptions.value.heroes.filter(
    hero => hero.race.id === selectedRaceId.value
  )
})

onMounted(async () => {
  loading.value = true
  activationOptions.value = await fetchActivationOptions();
  loading.value = false
})

async function fetchActivationOptions(): Promise<ActivationOptions | null> {
  try {
    const res = await axios.get(
      `${baseUrl}/rounds/active/activation-options`,
      {
        withCredentials: true,
        headers: {
          Authorization: true
        }
      }
    );

    if (res.data) {
      return res.data as ActivationOptions;
    }
  } catch (error) {
    console.error(error)
  }

  return null
}

function formatBonusPercent(bonus: number): string {
  const percent = Math.round((bonus - 1) * 100);
  if (percent === 0) return "0%";
  return percent > 0 ? `+${percent}%` : `${percent}%`;
}

function goBackToRaceSelection() {
  selectedRaceId.value = null;
  selectedHeroId.value = null;
}

function goBackToHeroSelection() {
  selectedHeroId.value = null;
  selectedNationId.value = null;
}

async function joinNation() {
  if (!selectedRaceId.value || !selectedHeroId.value || !selectedNationId.value) return;
  try {
    await axios.post(
      `${baseUrl}/players`,
      {
        race: {
          id: selectedRaceId.value
        },
        hero: {
          id: selectedHeroId.value
        },
        nation: {
          id: selectedNationId.value
        }
      },
      {
        withCredentials: true,
        headers: {
          Authorization: true
        }
      }
    );
    
    location.reload();
  } catch (error) {
    console.error(error);
  }
}

</script>
