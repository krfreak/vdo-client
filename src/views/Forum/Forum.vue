<template>
  <div class="container">
    <div>Breadcrumbs</div>
    <div>Pagination</div>
    <div class="thread-overview">
      <table>
        <thead>
          <tr>
            <th>Thema</th>
            <th>Beiträge</th>
            <th>Autor</th>
            <th>Letzter Beitrag</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="thread in threads" :key="thread.id">
            <td>
              <a :href="`/viewthread/${thread.id}`">{{ thread.name }}</a>
            </td>
            <td>{{ thread.posts }}</td>
            <td>{{ thread.author }}</td>
            <td>{{ thread.lastPost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ForumThread } from "../../components/forum/typings";
import type { PropType } from "vue";

defineProps({
  threads: {
    type: Array as PropType<ForumThread[]>,
    default: () => [
      {
        id: 1,
        name: "test",
        posts: 23,
        author: "Hans Wurst",
        lastPost: new Date(),
        sticky: false,
        locked: false,
      },
      {
        id: 1,
        name: "test",
        posts: 23,
        author: "Hans Wurst",
        lastPost: new Date(),
        sticky: false,
        locked: false,
      },
      {
        id: 1,
        name: "test",
        posts: 23,
        author: "Hans Wurst",
        lastPost: new Date(),
        sticky: false,
        locked: false,
      },
    ],
  },
});
</script>
