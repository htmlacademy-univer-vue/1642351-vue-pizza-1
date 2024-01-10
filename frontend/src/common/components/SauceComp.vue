<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in normalizedSauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.sauce"
        :checked="sauce.sauce === modelValue.sauce"
        @input="
          emit('update:modelValue', {
            ...sauce,
            sauce: $event.target.value,
            price: sauce.price,
          })
        "
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  normalizedSauces: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
