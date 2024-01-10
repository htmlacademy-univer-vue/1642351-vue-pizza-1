<template>
  <label class="input">
    <span class="visually-hidden">{{ label }}</span>
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="emits('input', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, default: "" },
});
const emits = defineEmits(["input"]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";
</style>
