<template>
  <div class="container grid grid-cols-3 gap-20">
    <div class="grid grid-cols-3 gap-4">
      <p>
        {{ events }}
      </p>
    </div>
    <div class="grid grid-cols-1 gap-2">
      <p>Burgen: {{ resourceData?.villages || randomInt(0, 12345) }}</p>
      <p>Bevölkerung: {{ resourceData?.population || randomInt(0, 12345) }}</p>
      <p>
        Tick
        {{ resourceData?.tick || randomInt(0, 12345) }}:
        {{ resourceData?.tickTime || randomInt(0, 12345) }}
      </p>
    </div>
    <div class="grid grid-cols-1 gap-2">
      <p>Filar: {{ resourceData?.filar || randomInt(0, 12345) }}</p>
      <p>
        Seelen:
        {{ resourceData?.souls || randomInt(0, 12345) }}
      </p>
      <p>
        Aktionspunkte:
        {{ resourceData?.actionPoints || randomInt(0, 12345) }}
      </p>
    </div>
    <div class="spacer"></div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Resource, GameEvent } from './typings'

defineProps({
  resourceData: {
    type: Object as PropType<Resource>
  },
  events: {
    type: Object as PropType<GameEvent>
  }
})

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
</script>
