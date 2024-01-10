<template>
  <button type="button" class="button" :disabled="disabled">{{ label }}</button>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  disabled: { type: Boolean, default: true },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
