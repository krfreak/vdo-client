<template>
  <div class="container">
    <div>Breadcrumbs</div>
    <div class="forum-overview">
      <table>
        <thead>
          <tr>
            <th>Foren</th>
            <th>Themen</th>
            <th>Letzter Beitrag</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="forum in forums" :key="forum.id">
            <td>
              <a :href="`/viewforum/${forum.id}`">{{ forum.name }}</a>
            </td>
            <td>{{ forum.topics }}</td>
            <td>{{ forum.lastEntry }}</td>
          </tr>
        </tbody>
      </table>
      <a :href="`/viewguide/forum`">Forum Hilfe</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { Forum } from "./typings";

const props = defineProps({
  forums: {
    type: Array as PropType<Forum[]>,
    default: () => [],
  },
});
</script>
