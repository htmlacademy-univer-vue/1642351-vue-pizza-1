<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <SectionTitle size="big">Конструктор пиццы</SectionTitle>
        <DoughComp
          v-model="pizza_store.dough"
          :normalized-doughs="data_store.dough"
        />

        <SizeComp
          v-model="pizza_store.size"
          :normalized-sizes="data_store.sizes"
        />

        <div class="content__ingredients">
          <SheetCard class="ingredients">
            <template #title>Выберите ингредиенты</template>
            <SauceComp
              v-model="pizza_store.sauce"
              :normalized-sauces="data_store.sauce"
            />
            <IngredientsComp
              :normalized-ingredients="data_store.ingredients"
              :selected-ingredients="pizza_store.ingredients"
              @upgrade-ingredient-count="pizza_store.upgradeIngredientCount"
            />
          </SheetCard>
        </div>

        <PizzaComp
          v-model="pizza_store.name"
          :sauce="pizza_store.sauce"
          :disabled-button="buttonDisabled"
          :ingredients="pizza_store.ingredients"
          :dough="pizza_store.dough"
          :price="pizza_store.fullPizzaPrice"
          @ing_add="pizza_store.ing_add"
          @add-pizza="addPizza"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed } from "vue";

import { SheetCard, SectionTitle } from "../common/components";
import {
  DoughComp,
  SizeComp,
  SauceComp,
  IngredientsComp,
  PizzaComp,
} from "../common/components";

import { DataStore, PizzaStore, CartStore } from "../states_store";
import { useRoute, useRouter } from "vue-router";
const cart_store = CartStore();
const data_store = DataStore();
const pizza_store = PizzaStore();

const route = useRoute();
const router = useRouter();

const { id } = route.params;
if (id) {
  pizza_store.pizzaState_set(
    cart_store.pizzas.find((pizza) => pizza.id === +id)
  );
} else {
  setTimeout(() => {
    pizza_store.pizzaState_set({
      id: cart_store.pizzas.length + 1,
      name: "",
      dough: data_store.dough[0],
      size: data_store.sizes[0],
      sauce: data_store.sauce[0],
      ingredients: [],
    });
  }, "1000");
}
const addPizza = () => {
  if (id) {
    cart_store.pizza_edit(pizza_store.getPizzaInfo);
    router.push("/cart");
  } else {
    cart_store.pizza_add(pizza_store.getPizzaInfo);
    router.push("/cart");
  }
};

const buttonDisabled = computed(() => {
  return pizza_store.name === "";
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
