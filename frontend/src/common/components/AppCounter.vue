<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === 0"
      @click="emits('decrement')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="orange === true && 'counter__button--orange'"
      :disabled="count === 3"
      @click="emits('increment')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, required: true },
  orange: { type: Boolean, default: false },
});
const emits = defineEmits(["increment", "decrement"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
