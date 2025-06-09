<template>
  <h1>Name der Nation</h1>
  <input v-model="name" placeholder="Nationsname" />
  <h1>Nationsbild</h1>
  <button>Bild hochladen</button>
  <h1>Vize der Nation</h1>
  <select v-model="selectedVice">
    <option disabled value="">Spieler auswählen</option>
    <option v-for="player in nation.players" :key=player.id>{{ player }}</option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
    nation: {
        players: {
            type: Array as () => string[],
            default: () => []
        },
    }
});
</script>
