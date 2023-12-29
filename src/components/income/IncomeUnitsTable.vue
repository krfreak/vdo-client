<template>
  <div class="income-units-table">
    <strong>Einheiten</strong><br />
    <table>
      <tbody v-for="unit in props.units" :key="unit.name">
        <tr>
          <td>{{ unit.amount }}</td>
          <td>{{ unit.name }}</td>
          <td>&nbsp;</td>
          <td>{{ unit.cost }} Filar</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { UnitIncomeList } from "./typings";

const props = defineProps({
  units: {
    type: Array as PropType<UnitIncomeList[]>,
    default: () => [{ amount: 10, name: "Bautrupps", cost: 0 }],
  },
});
</script>
