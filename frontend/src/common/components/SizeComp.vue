<template>
  <div class="content__diameter">
    <SheetCard class="diameter">
      <template #title>Выберите размер</template>
      <label
        v-for="size in normalizedSizes"
        :key="size.id"
        class="diameter__input"
        :class="`diameter__input--${size.size}`"
      >
        <input
          type="radio"
          name="diameter"
          :value="size.size"
          class="visually-hidden"
          :checked="size.size === modelValue.size"
          @input="
            emit('update:modelValue', {
              ...size,
              size: $event.target.value,
              multiplier: size.multiplier,
            })
          "
        />
        <span>{{ size.name }}</span>
      </label>
    </SheetCard>
  </div>
</template>

<script setup>
import { SheetCard } from "../../common/components";
defineProps({
  normalizedSizes: { type: Array, required: true },
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
