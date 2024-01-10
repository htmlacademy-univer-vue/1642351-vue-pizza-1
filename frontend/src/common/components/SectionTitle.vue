<template>
  <h1 v-if="size === 'big'" class="title title--big">
    <slot />
  </h1>
  <h2 v-else class="title title--small">
    <slot />
  </h2>
</template>

<script setup>
defineProps({
  size: { type: String, default: "small" },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
