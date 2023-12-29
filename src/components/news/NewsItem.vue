<template>
  <div class="news-item">
    <h3>{{ props.tick }}: {{ props.message }}</h3>
    <img :src="props.imageUrl" :alt="imageAlt" />
    <p>{{ props.text }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  tick: {
    type: Number,
    default: 0,
  },
  message: {
    type: String,
    default: "Neue Nachricht",
  },
  text: {
    type: String,
    default:
      "Cillum magna proident qui quis excepteur in fugiat enim dolor incididunt magna adipisicing. Aute aliquip esse anim ullamco esse culpa ipsum tempor incididunt. Magna do id dolore ipsum in et officia quis velit veniam cillum pariatur. Officia incididunt reprehenderit tempor consequat deserunt ut reprehenderit duis. Lorem laboris aliquip exercitation sit cillum dolor quis. Voluptate velit et aliqua amet eiusmod pariatur aliquip dolore. Consectetur laboris fugiat veniam laboris aliquip sunt labore culpa duis nisi et deserunt id ullamco.",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  imageAlt: {
    type: String,
    default: "Ein Bild",
  },
});
</script>
