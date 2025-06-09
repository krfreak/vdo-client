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
      <tr v-for="group in diplomacy" :key="group.id">
        <td>{{ group.name  }}</td>
        <td>{{ group.status  }}</td>
        <td>{{ group.ours }}</td>
        <td>{{ group.theirs }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { GroupDiplomacy } from "./typings";

const props = defineProps({
  diplomacy: {
    type: Array as PropType<GroupDiplomacy[]>,
    default: () => [],
  },
});


</script>
