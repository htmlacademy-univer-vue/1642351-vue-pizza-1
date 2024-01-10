<template>
  <div class="sheet">
    <SectionTitle class="sheet__title">
      <slot name="title" />
    </SectionTitle>
    <div class="sheet__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { SectionTitle } from "@/common/components";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
