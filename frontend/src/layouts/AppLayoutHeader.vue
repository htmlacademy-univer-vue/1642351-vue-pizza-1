<template>
  <div class="appLayout">
    <app-header />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>

<style lang="scss" scoped>
.appLayout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
