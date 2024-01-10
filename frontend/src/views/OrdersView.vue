<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <SectionTitle size="big">История заказов</SectionTitle>
      </div>

      <section
        v-for="order in profile_store.orders"
        :key="order.id"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span
              >Сумма заказа:
              {{
                getTotalOrderPrice(order, order.orderPizzas, order.orderMisc)
              }}
              ₽</span
            >
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="profile_store.order_drop(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button
              type="button"
              class="button"
              @click="
                profile_store.order_add({
                  userId: auth_store.user.id,
                  pizzas: getFilteredPizzas(order),
                  misc: getFilteredMiscs(order),
                  address: {
                    street: order.orderAddress.street,
                    building: order.orderAddress.building,
                    flat: order.orderAddress.flat,
                    comment: order.orderAddress.comment,
                  },
                  phone: order.phone,
                })
              "
            >
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
            class="order__item"
          >
            <div class="product">
              <img
                src="../assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getSizeNameById(pizza.sizeId) }},
                    {{ getDoughNameById(pizza.doughId) }}
                  </li>
                  <li>Соус: {{ getSauceNameById(pizza.sauceId) }}</li>
                  <li>
                    {{ getIngredientString(pizza.ingredients) }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              {{
                priceString(
                  pizza.quantity,
                  getPizzaPrice(
                    pizza.sauceId,
                    pizza.sizeId,
                    pizza.doughId,
                    pizza.ingredients
                  )
                )
              }}
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc in order.orderMisc" :key="misc.id">
            <img
              :src="getMiscImgById(misc.miscId)"
              width="20"
              height="30"
              :alt="misc.name"
            />
            <p>
              <span>{{ getMiscNameById(misc.miscId) }}</span>
              <b>{{ getMiscPriceById(misc.miscId) }} ₽ X {{ misc.quantity }}</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки: {{ getAddressString(order.orderAddress) }}
        </p>
      </section>
    </div>
  </main>
</template>

<script setup>
import { SectionTitle } from "../common/components";
import { ProfileStore, DataStore, AuthStore } from "../states_store/";
import {
  getImageUrl,
  getFilteredPizzas,
  getFilteredMiscs,
} from "@/common/helpers";

const profile_store = ProfileStore();
const data_store = DataStore();
const auth_store = AuthStore();
const priceString = (price, quantity) => {
  return `${quantity} x ${price} ₽`;
};

const getAddressString = (address) => {
  return `ул. ${address?.street}, дом ${address?.building}, кв. ${address?.flat}`;
};
const getPizzaPrice = (sauceId, sizeId, doughId, ingredients) => {
  const saucePrice = data_store.sauce.find(
    (sauce) => sauce.id === sauceId
  ).price;
  const sizeMultiplier = data_store.sizes.find(
    (size) => size.id === sizeId
  ).multiplier;
  const doughPrice = data_store.dough.find(
    (dough) => dough.id === doughId
  ).price;

  let ingredientsPrice = 0;

  ingredients?.map((ing) => {
    data_store.ingredients.map((ingg) => {
      if (ingg.id === ing.ingredientId)
        ingredientsPrice = ingredientsPrice + ing.quantity * ingg.price;
    });
  });

  return (ingredientsPrice + saucePrice + doughPrice) * sizeMultiplier;
};
const getIngredientString = (ingredients) => {
  let ingredientsString = "";

  ingredients?.map((item) => {
    data_store.ingredients.map((dataItem) => {
      if (dataItem.id === item.ingredientId)
        ingredientsString = ingredientsString + dataItem.name + ", ";
    });
  });

  return ingredientsString;
};

const getSizeNameById = (id) => {
  return data_store.sizes.find((size) => size.id === id).name;
};

const getSauceNameById = (id) => {
  return data_store.sauce.find((sauce) => sauce.id === id).name;
};

const getDoughNameById = (id) => {
  return data_store.dough.find((dough) => dough.id === id).name;
};

const getMiscNameById = (id) => {
  return data_store.misc.find((dough) => dough.id === id).name;
};

const getMiscPriceById = (id) => {
  return data_store.misc.find((dough) => dough.id === id).price;
};

const getMiscImgById = (id) => {
  const image = data_store.misc.find((dough) => dough.id === id).image;
  return getImageUrl(image);
};

const getTotalOrderPrice = (order, pizzas, miscs) => {
  let pizzasPrice = 0;
  let miscsPrice = 0;
  pizzas.map(
    (pizza) =>
      (pizzasPrice =
        pizzasPrice +
        getPizzaPrice(
          pizza.sauceId,
          pizza.sizeId,
          pizza.doughId,
          pizza.ingredients
        ) *
          pizza.quantity)
  );
  if (miscs)
    miscs.map(
      (misc) =>
        (miscsPrice =
          miscsPrice + misc.quantity * getMiscPriceById(misc.miscId))
    );
  return pizzasPrice + miscsPrice;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
