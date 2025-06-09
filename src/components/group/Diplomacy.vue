<template>
  <table>
    <thead>
      <tr>
        <th>Nation</th>
        <th>Status</th>
        <th>Unser Angebot</th>
        <th>Gegnerisches Angebot</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="nation in diplomacy" :key="nation.id">
        <td>{{ nation.name  }}</td>
        <td>{{ nation.status  }}</td>
        <td>{{ nation.ours }}</td>
        <td>{{ nation.theirs }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { NationDiplomacy } from "./typings";

const props = defineProps({
  diplomacy: {
    type: Array as PropType<NationDiplomacy[]>,
    default: () => [],
  },
});


</script>
