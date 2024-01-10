<template>
  <ul class="cart-list sheet">
    <li v-for="pizza in pizzas" :key="pizza.id" class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>{{ pizza.size.name }}, {{ pizza.dough.name }}</li>
            <li>Соус: {{ pizza.sauce.name }}</li>
            <li>Начинка: {{ pizza.ingredientsStr }}</li>
          </ul>
        </div>
      </div>

      <AppCounter
        class="cart-list__counter"
        :count="pizza.quantity"
        :orange="true"
        :max="10"
        @decrement="decrement(pizza.id, pizza.quantity - 1)"
        @increment="increment(pizza, pizza.quantity + 1)"
      />

      <div class="cart-list__price">
        <b>{{ pizza.price * pizza.quantity }}</b>
      </div>

      <div class="cart-list__button">
        <router-link :to="`/${pizza.id}`" class="cart-list__edit"
          >Изменить</router-link
        >
      </div>
    </li>
  </ul>
</template>

<script setup>
import { AppCounter } from "@/common/components";
defineProps({
  pizzas: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["addPizza", "deletePizza"]);
const decrement = (id) => {
  emits("deletePizza", id);
};
const increment = (pizza) => {
  emits("addPizza", pizza);
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
