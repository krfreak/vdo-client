<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex border-b border-gray-300 mb-6">
      <button
        v-for="tab in tabs" :key="tab" @click="activeTab = tab"
        :class="[
          'px-4 py-2 font-semibold',
          activeTab === tab ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="activeTab === 'Nationen'">
      <NationLeaderboard />
    </div>
    <div v-else-if="activeTab === 'Spieler'">
      <PlayerLeaderboard />
    </div>
    <div v-else-if="activeTab === 'Statistiken'">
      <StatisticsOverview />
    </div>
    <div v-else-if="activeTab === 'Spezialdörfer'">
      <Sanctuaries />
    </div>
    <div v-else-if="activeTab === 'Wer ist online?'">
      <WhoIsOnline />
    </div>
  </div>
</template>

<script setup lang="ts">
import NationLeaderboard from '@/components/Leaderboard/NationLeaderboard.vue'
import PlayerLeaderboard from '@/components/Leaderboard/PlayerLeaderboard.vue'
import StatisticsOverview from '@/components/Leaderboard/Stats/StatisticsOverview.vue'
import Sanctuaries from '@/components/Leaderboard/Sanctuaries.vue'
import WhoIsOnline from '@/components/Leaderboard/WhoIsOnline.vue'
import { ref } from 'vue'

const tabs = ['Nationen', 'Spieler', 'Statistiken', 'Spezialdörfer', 'Wer ist online?']
const activeTab = ref(tabs[0])
</script>