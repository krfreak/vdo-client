<template>
  <p>Einer Nation ein Friedensangebot machen.</p>
  <input /><button>Senden</button>
  <p>Einer Nation den Krieg erklären.</p>
  <input /><button>Senden</button>
  <h1>Nationsdiplomatie</h1>
  <DiplomacyTable :diplomacy="diplomacy"></DiplomacyTable>
</template>
<script setup lang="ts">
const props = defineProps({
  diplomacy: {
    default: () => [],
  },
});
</script>
