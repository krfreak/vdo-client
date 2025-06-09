<template>
  <div class="game-content">
    <div class="container">
      <img src="/images/races/elras/units/skelett.png" />
      <strong>Hier Meister, eure Steuereinnahmen!</strong>
    </div>
    <div class="container-vertical">
      <IncomeTable></IncomeTable>
      <IncomeUnitsTable></IncomeUnitsTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import IncomeTable from '@/components/income/IncomeTable.vue';
import IncomeUnitsTable from '@/components/income/IncomeUnitsTable.vue';
</script>
