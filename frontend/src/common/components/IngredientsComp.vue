<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in normalizedIngredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag
          :transfer-data="ingredient"
          :draggable="getValue(ingredient.id) < 3"
        >
          <span class="filling" :class="`filling--${ingredient.ingredient}`">{{
            ingredient.name
          }}</span></AppDrag
        >

        <AppCounter
          class="ingredients__counter"
          :ingredient="ingredient.ingredient"
          :count="getValue(ingredient.id)"
          @decrement="
            decrement(
              {
                id: ingredient.id,
                ingredient: ingredient.ingredient,
                name: ingredient.name,
                price: ingredient.price,
              },
              getValue(ingredient.id) - 1
            )
          "
          @increment="
            increment(
              {
                id: ingredient.id,
                ingredient: ingredient.ingredient,
                name: ingredient.name,
                price: ingredient.price,
              },
              getValue(ingredient.id) + 1
            )
          "
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { AppCounter, AppDrag } from "../../common/components";
const props = defineProps({
  normalizedIngredients: {
    type: Array,
    required: true,
  },
  selectedIngredients: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["upgradeIngredientCount"]);

const getValue = (id) => {
  const have = props.selectedIngredients.find((item) => item?.id === id) ?? -1;
  if (have === -1) {
    return 0;
  } else {
    return have.quantity;
  }
};

const decrement = (ingredient, count) => {
  emits("upgradeIngredientCount", ingredient, count);
};

const increment = (ingredient, count) => {
  emits("upgradeIngredientCount", ingredient, count);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
