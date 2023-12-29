<template>
  <div class="forum">
    <div>Breadcrumbs</div>
    <div class="forum-overview">
      <div class="row-head">
        <div class="topic">Foren</div>
        <div class="topics">Themen</div>
        <div class="last-entry">Letzter Beitrag</div>
      </div>
      <div class="row" v-for="forum in forums" :key="forum.id">
        <div class="topic">
          <a :href="`/viewforum/${forum.id}`">{{ forum.name }}</a>
        </div>
        <div class="topics">{{ forum.topics }}</div>
        <div class="last-entry">
          {{
            new Date(forum.lastEntry).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          }}
        </div>
      </div>
    </div>
    <a :href="`/viewguide/forum`">Forum Hilfe</a>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import type { Forum } from "../../components/forum/typings";

defineProps({
  forums: {
    type: Array as PropType<Forum[]>,
    default: () => [
      {
        id: 1,
        name: "Neuigkeiten",
        topics: 60,
        lastEntry: new Date(),
      },
    ],
  },
});
</script>
