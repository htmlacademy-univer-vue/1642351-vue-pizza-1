<template>
  <div class="content__pizza">
    <TextInput
      name="pizza_name"
      label="Название пиццы"
      placeholder="Введите название пиццы"
      :value="modelValue"
      @input="setName"
    />
    <AppDrop
      @drop="
        emits('ing_add', {
          id: $event.id,
          ingredient: $event.ingredient,
          name: $event.name,
          price: $event.price,
        })
      "
    >
      <div class="content__constructor">
        <div
          class="pizza"
          :class="`pizza--foundation--${dough.doughSize}-${sauce.sauce}`"
        >
          <div class="pizza__wrapper">
            <transition-group name="ing" mode="out-in">
              <div
                v-for="(quantity, ingredient) in pizzaIngredients"
                :key="ingredient.id * Math.random()"
                class="pizza__filling"
                :class="[
                  `pizza__filling--${ingredient}`,
                  quantity === 2 && 'pizza__filling--second',
                  quantity === 3 && 'pizza__filling--third',
                ]"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ price }} ₽</p>
      <NormalButton
        :disabled="props.disabledButton"
        label="Готовьте!"
        @click="emits('addPizza')"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { AppDrop, TextInput, NormalButton } from "../../common/components";

const props = defineProps({
  sauce: {
    type: Object,
    required: true,
  },
  dough: {
    type: Object,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  disabledButton: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["ing_add", "update:modelValue", "addPizza"]);

const pizzaIngredients = computed(() => {
  return props.ingredients.reduce((result, ingredientt) => {
    const { ingredient, quantity } = ingredientt;
    if (quantity > 0) {
      result[ingredient] = quantity;
    }
    return result;
  }, {});
});

const setName = (name) => {
  emits("update:modelValue", name);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.ing-enter-active,
.ing-leave-active {
  transition: opacity 1s ease;
}

.ing-enter-from,
.ing-leave-to {
  opacity: 0;
}
</style>
