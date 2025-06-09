<template>
  <div class="income-table">
    <strong>Einkommen</strong>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Bevölkerung</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.pops)">
              {{ getText(props.pops) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Silberminen</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.mines)">
              {{ getText(props.mines) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Verwaltung</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.administration)">
              {{ getText(props.administration) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow v-if="props.race > 0">
          <TableCell>Rasse</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.race)">
              {{ getText(props.race) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow v-if="props.thieves > 0">
          <TableCell>Diebinnen</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.thieves)">
              {{ getText(props.thieves) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Einheiten</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.units)">
              {{ getText(props.units) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell><strong>Gesamt</strong></TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell class="right">
            <p :class="getTextColorClass(props.total)">
              {{ getText(props.total) }}
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>&nbsp;</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
        <TableRow :class="getTextColorClass(props.popGrowth)">
          <TableCell><strong>Bevölkerungswachstum</strong></TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{{ props.popGrowth }} Einwohner</TableCell>
        </TableRow>
        <TableRow v-if="props.souls > 0" :class="getTextColorClass(props.souls)">
          <TableCell><strong>Seeleneinkommen</strong></TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{{ props.souls }} Seelen</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <br />
  </div>
</template>
<script setup lang="ts">
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
  pops: {
    type: Number,
    default: 0
  },
  mines: {
    type: Number,
    default: 0
  },
  administration: {
    type: Number,
    default: 0
  },
  thieves: {
    type: Number,
    default: 0
  },
  units: {
    type: Number,
    default: 0
  },
  race: {
    type: Number,
    default: 0
  },
  souls: {
    type: Number,
    default: 0
  },
  popGrowth: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
})

function getTextColorClass(value: number) {
  let text = ''
  if (value < 0) {
    text = 'lighter-red-text'
  } else if (value > 0) {
    text = 'lighter-green-text'
  }
  return text
}

function getText(value: number) {
  return `${value >= 0 ? '+' : '-'}${value} Filar`
}
</script>
