<template>
  <div class="income-table">
    <strong>Einkommen</strong>
    <table>
      <tbody>
        <tr class="top-row">
          <td class="top-row">Bevölkerung</td>
          <td class="top-row">&nbsp;</td>
          <td class="right top-row">
            <p :class="getTextColorClass(props.pops)">
              {{ getText(props.pops) }}
            </p>
          </td>
        </tr>
        <tr>
          <td>Silberminen</td>
          <td>&nbsp;</td>
          <td class="right">
            <p :class="getTextColorClass(props.mines)">
              {{ getText(props.mines) }}
            </p>
          </td>
        </tr>
        <tr>
          <td>Verwaltung</td>
          <td>&nbsp;</td>
          <td class="right">
            <p :class="getTextColorClass(props.administration)">
              {{ getText(props.administration) }}
            </p>
          </td>
        </tr>
        <tr v-if="props.race > 0">
          <td>Rasse</td>
          <td>&nbsp;</td>
          <td class="right">
            <p :class="getTextColorClass(props.race)">
              {{ getText(props.race) }}
            </p>
          </td>
        </tr>
        <tr v-if="props.thieves > 0">
          <td>Diebinnen</td>
          <td>&nbsp;</td>
          <td class="right">
            <p :class="getTextColorClass(props.thieves)">
              {{ getText(props.thieves) }}
            </p>
          </td>
        </tr>
        <tr>
          <td>Einheiten</td>
          <td>&nbsp;</td>
          <td class="right">
            <p :class="getTextColorClass(props.units)">
              {{ getText(props.units) }}
            </p>
          </td>
        </tr>
        <tr>
          <td class="top-row"><strong>Gesamt</strong></td>
          <td class="top-row">&nbsp;</td>
          <td class="right top-row">
            <p :class="getTextColorClass(props.total)">
              {{ getText(props.total) }}
            </p>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr :class="getTextColorClass(props.popGrowth)">
          <td><strong>Bevölkerungswachstum</strong></td>
          <td>&nbsp;</td>
          <td>{{ props.popGrowth }} Einwohner</td>
        </tr>
        <tr v-if="props.souls > 0" :class="getTextColorClass(props.souls)">
          <td><strong>Seeleneinkommen</strong></td>
          <td>&nbsp;</td>
          <td>{{ props.souls }} Seelen</td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  pops: {
    type: Number,
    default: 0,
  },
  mines: {
    type: Number,
    default: 0,
  },
  administration: {
    type: Number,
    default: 0,
  },
  thieves: {
    type: Number,
    default: 0,
  },
  units: {
    type: Number,
    default: 0,
  },
  race: {
    type: Number,
    default: 0,
  },
  souls: {
    type: Number,
    default: 0,
  },
  popGrowth: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

function getTextColorClass(value: number) {
  let text = "";
  if (value < 0) {
    text = "lighter-red-text";
  } else if (value > 0) {
    text = "lighter-green-text";
  }
  return text;
}

function getText(value: number) {
  return `${value >= 0 ? "+" : "-"}${value} Filar`;
}
</script>
