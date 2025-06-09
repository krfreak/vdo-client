<template>
  <div class="income-units-table">
    <strong>Einheiten</strong><br />
    <Table>
      <TableBody v-for="unit in props.units" :key="unit.name">
        <TableRow>
          <TableCell>{{ unit.amount }}</TableCell>
          <TableCell>{{ unit.name }}</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{{ unit.cost }} Filar</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { UnitIncomeList } from './typings'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
const props = defineProps({
  units: {
    type: Array as PropType<UnitIncomeList[]>,
    default: () => [{ amount: 10, name: 'Bautrupps', cost: 0 }]
  }
})
</script>
