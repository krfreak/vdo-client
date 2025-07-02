<template>
    <div class="flex border-b border-gray-200 mb-4 mt-4">
        <button
            v-for="tab in subTabs" :key="tab" @click="activeSubTab = tab"
            :class="[
                'px-3 py-1 font-medium',
                activeSubTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            ]"
        >
            {{ tab }}
        </button>
    </div>
    <div>
        <div v-if="activeSubTab === 'Welt Statistik'">
            <p>Welt Statistik</p>
        </div>
        <div v-else-if="activeSubTab === 'Rassen Statistik'">
            <p>Rassen Statistik</p>
        </div>
        <div v-else-if="activeSubTab === 'Militär Statistik'">
            <p>Militär Statistik</p>
        </div>
        <div v-else-if="activeSubTab === 'Persönliche Statistik'">
            <p>Persönliche Statistik</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const subTabs = [
    'Welt Statistik', 
    'Rassen Statistik', 
    'Militär Statistik',
    'Persönliche Statistik'
]
const activeSubTab = ref(subTabs[0])
</script>