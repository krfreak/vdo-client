<template>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader>Nation</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Diplomatie</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow v-for="group in diplomacy" :key="group.id">
        <TableCell>{{ group.id }}</TableCell>
        <TableCell>{{ group.name }}</TableCell>
        <TableCell>{{ group.diplomacy }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Group, GroupDiplomacy } from './typings'
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
  diplomacy: {
    type: Array as PropType<Group[]>,
    default: () => []
  }
})
</script>
