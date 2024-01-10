<template>
  <div class="appLayout">
    <AppHeader></AppHeader>
    <AppSB></AppSB>
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
import AppSB from "./AppSB.vue";
</script>

<style lang="scss" scoped>
.appLayout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
