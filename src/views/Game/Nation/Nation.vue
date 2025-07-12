<template>
  <p v-if="selectedNation == null">Diese Nation existiert nicht!</p>
  <div v-else>
    <h1 v-if="selectedNation.name !== null" class="text-center">{{ selectedNation.name }} #{{ selectedNation.number }} <a href="/map" class="hover:underline">(10,10)</a></h1>
    <h1 v-else class="text-center">Nation #{{ selectedNation.number }} <a href="/map" class="hover:underline">(10,10)</a></h1>
    <div class="flex items-center justify-center mt-2">
      <button v-if="selectedNation.number > 0" class="bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer"
        @click="goToNation(selectedNation.number - 1)">
        <img src="/public/images/plinks.gif" alt="Pfeil links" class="h-4 w-4 mr-2" />
      </button>
      <template v-if="selectedNation.id !== myNationId">
        <p class="text-center">
          Wir haben <span class="font-bold text-blue-900">Frieden</span> mit dieser Nation.
        </p>
      </template>
      <template v-else>
        <div class="flex gap-4">
          <RouterLink to="/nationforum" class="hover:underline">Nationsforum</RouterLink>
          <RouterLink to="/voting" class="hover:underline">Abstimmen</RouterLink>
          <RouterLink to="/supplies" class="hover:underline">Hilfslieferung</RouterLink>
          <RouterLink to="#" class="hover:underline">Nachrichten</RouterLink>
          <RouterLink to="/diplomacy" class="hover:underline">Diplomatie</RouterLink>
          <RouterLink  v-if="isLeader" to="/leader" class="hover:underline">Herrscher Optionen</RouterLink>
        </div>
      </template>
      <button class="bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer"
        @click="goToNation(selectedNation.number + 1)">
        <img src="/public/images/prechts.gif" alt="Pfeil rechts" class="h-4 w-4 ml-2" />
      </button>
    </div>
    <div v-if="selectedNation" class="flex items-center justify-center mt-4">
      <img
        :src="nationImageSrc"
        :alt="nationImageAlt"
        class="max-h-[20rem] max-w-[20rem]"
      />
    </div>
    <div class="flex justify-center mt-4">
      <table class="min-w-max rounded shadow text-sm">
        <thead>
          <tr>
            <th class="px-2 py-1 "></th>
            <th class="px-2 py-1 ">Name</th>
            <th class="px-2 py-1 ">Held</th>
            <th class="px-2 py-1 ">Dörfer</th>
            <th class="px-2 py-1 ">Bevölkerung</th>
            <th class="px-2 py-1 ">Letzter Login</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in selectedNation.players" :key="player.id">
            <td v-if="selectedNation.leader && selectedNation.leader.id === player.id" class="px-2 py-1">Herrscher</td>
            <td v-else-if="selectedNation.viceLeader && selectedNation.viceLeader.id === player.id" class="px-2 py-1">Vize</td>
            <td v-else class="px-2 py-1"></td>

            <td v-if="selectedNation.leader && selectedNation.leader.id === player.id" class="px-2 py-1 text-blue-900 font-bold">{{ player.name }}</td>
            <td v-else class="px-2 py-1">{{ player.name }}</td>
            
            <td class="px-2 py-1 text-center">
              <img
                v-if="player.hero?.imageUri"
                :src="player.hero.imageUri"
                :alt="player.hero?.name"
                class="w-6 h-6 inline-block"
              />
            </td>
            <td class="px-2 py-1 text-center">{{ player.countOfVillages }}</td>
            <td class="px-2 py-1 text-center">{{ player.population }}</td>
            <td class="px-2 py-1 "></td>
          </tr>
        </tbody>
      </table>
  </div>
  <div v-if="selectedNation?.description" class="mt-6 mx-auto max-w-2xl rounded-2xl shadow p-4 border border-gray-200">
        <p class="text-xs text-gray-500 mb-2">Nationsbeschreibung</p>
        <p class="text-sm whitespace-pre-line break-words">{{ selectedNation.description }}</p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, type NavigationRedirectError } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { fetchFromApi, fetchFileFromApi } from '@/utils/fetch'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const nationParam = computed(() => {
  if (route.params.nationId)
    return route.params.nationId
  
  return userStore.me?.player?.nation?.number 
})


const selectedNation = ref<Nation | null>(null)
const imageUrl = ref<string | null>(null)

const isLeader = computed(() => {
  return selectedNation.value?.leader?.id === userStore.me?.player?.id
})

async function loadNation() {
  if (nationParam.value) {
    const nations = await fetchFromApi<Nation[]>('/nations', {
      params: { number: nationParam.value }
    })

    if (nations && nations.length == 1) {
      selectedNation.value = nations[0]
    }
  }
}

watch(selectedNation, async () => {
    if (selectedNation.value && selectedNation.value.imageUri) {
      try {
        const blob = await fetchFileFromApi(`/nations/${selectedNation.value.id}/image`)
        imageUrl.value = URL.createObjectURL(blob)
      } catch (err) {
        imageUrl.value = null
      }
    } else {
      imageUrl.value = null
    }
})

onMounted(loadNation)

watch(nationParam, loadNation)

function goToNation(nationNumber: number) {
  router.push({ name: 'nation', params: { nationId: nationNumber } })
}

const nationImages = [
  {
    src: "/images/races/clan/units/ritter.png",
    alt: "Clan"
  },
  {
    src: "/images/races/vampire/units/vampir.png",
    alt: "Vampire"
  },
  {
    src: "/images/races/elras/units/elras.png",
    alt: "Elras"
  }
]

const nationImageSrc = computed(() => {
  if (!selectedNation.value) return ''

  if (imageUrl.value) {
    return imageUrl.value
  } else {
    const idx = selectedNation.value.number % 3
    return nationImages[idx].src
  }
})

const nationImageAlt = computed(() => {
  if (!selectedNation.value) return ''
  
  if (imageUrl.value) {
    return `Nation ${selectedNation.value.number}`
  } else {
    const idx = selectedNation.value.number % 3
    return nationImages[idx].alt
  }
})

const myNationId = computed(() => userStore.me?.player?.nation?.id)
</script>