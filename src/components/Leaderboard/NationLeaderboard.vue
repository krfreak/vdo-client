<template>
    <div v-if="loading">
        Lädt...
    </div>
    <div v-else class="overflow-x-auto">
        <table class="table-auto w-full border text-sm text-left">
            <thead>
            <tr>
                <th class="p-2 border">#</th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('number')">Name
                  <span v-if="sortKey === 'number'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('villages')">Dörfer
                  <span v-if="sortKey === 'villages'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('population')">Bevölkerung
                  <span v-if="sortKey === 'population'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('countOfPlayers')">Länder
                  <span v-if="sortKey === 'countOfPlayers'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="p-2 border cursor-pointer select-none" @click="sortBy('ritualPoints')">RP
                  <span v-if="sortKey === 'ritualPoints'" class="ml-1">
                    {{ sortAsc ? '↑' : '↓' }}
                  </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(nation, index) in sortedNations" :key="nation.id">
                <td class="p-2 border">{{ index + 1 }}</td>
                <td v-if="nation.name" class="p-2 border">{{ nation.name }} #{{ nation.number }} </td>
                <td v-else class="p-2 border">Nation #{{ nation.number }}</td>
                <td class="p-2 border">{{ nation.villages }}</td>
                <td class="p-2 border">{{ nation.population }}</td>
                <td class="p-2 border">{{ nation.countOfPlayers }}</td>
                <td class="p-2 border">{{ nation.ritualPoints }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchFromApi } from '@/utils/fetch'

const nations = ref<Nation[]>([])
const loading = ref(true)

const sortKey = ref<keyof Nation | null>('villages')
const sortAsc = ref(false)

function sortBy(key: keyof Nation) {
  if (key === sortKey.value) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = key === 'number' ? true : false
  }
}

const sortedNations = computed(() => {
  if (!sortKey.value) return nations.value

  const sorted = [...nations.value].sort((a, b) => {
    const aVal = a[sortKey.value!]
    const bVal = b[sortKey.value!]

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc.value ? aVal - bVal : bVal - aVal
    }

    return 0
  })

  return sorted
})

function prepareNations(rawNations: Nation[]): Nation[] {
  return rawNations.map(nation => {
    const players = Array.isArray(nation.players) ? nation.players : []
    const countOfPlayers = players.length
    const villages = players.reduce((sum, p) => sum + (p.countOfVillages || 0), 0)
    const population = players.reduce((sum, p) => sum + (p.population || 0), 0)
    return {
      ...nation,
      countOfPlayers,
      villages,
      population,
    }
  })
}

onMounted(async () => {
  loading.value = true
  const rawNations = await fetchFromApi<Nation[]>('/nations')
  nations.value = prepareNations(rawNations)
  loading.value = false
})

</script>