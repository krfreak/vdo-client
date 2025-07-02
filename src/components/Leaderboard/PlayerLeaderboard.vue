<template>
    <div class="overflow-x-auto">
        <table class="table-auto w-full border text-sm text-left">
            <thead>
            <tr>
                <th class="p-2 border">#</th>
                <th class="p-2 border">Land</th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('race')">Rasse
                  <span v-if="sortKey === 'race'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('nation')">Nation
                  <span v-if="sortKey === 'nation'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('countOfVillages')">Dörfer
                  <span v-if="sortKey === 'countOfVillages'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('population')">Bevölkerung
                  <span v-if="sortKey === 'population'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('quests')">Abenteuer
                  <span v-if="sortKey === 'quests'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('titlePoints')">Titel
                  <span v-if="sortKey === 'title'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(player, index) in sortedPlayers" :key="player.id">
                <td class="p-2 border">{{ index + 1 }}</td>
                <td class="p-2 border">{{ player.name }}</td>
                <td class="p-2 border">{{ player.race.name }}</td>
                <td class="p-2 border">Nation #{{ player.nation.number }}</td>
                <td class="p-2 border">{{ player.countOfVillages }}</td>
                <td class="p-2 border">{{ player.population }}</td>
                <td class="p-2 border">{{ player.quests }}</td>
                <td class="p-2 border">{{ player.title }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchFromApi } from '@/utils/fetch'

const players = ref<Player[]>([])
const loading = ref(true)

const sortKey = ref<keyof Player | null>('countOfVillages')
const sortAsc = ref(false)

function sortBy(key: keyof Player) {
  if (key === sortKey.value) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = key === 'nation' ? true : false
  }
}

const sortedPlayers = computed(() => {
  if (!sortKey.value) return players.value

  const sorted = [...players.value].sort((a, b) => {
    let aVal = null
    let bVal = null
    
    if (sortKey.value === 'race') {
        aVal = (a[sortKey.value!] as Race).id
        bVal = (b[sortKey.value!] as Race).id
    } else if (sortKey.value === 'nation') {
        aVal = (a[sortKey.value!] as Nation).number
        bVal = (b[sortKey.value!] as Nation).number
    } else {
        aVal = a[sortKey.value!]
        bVal = b[sortKey.value!]
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc.value ? aVal - bVal : bVal - aVal
    }

        return 0
  })

  return sorted
})

onMounted(async () => {
  loading.value = true
  players.value = await fetchFromApi<Player[]>('/players')
  loading.value = false
})

</script>