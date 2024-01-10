<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="createOrder"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <SectionTitle size="big">Корзина</SectionTitle>
        </div>

        <div v-if="!cart_store.getPizzas.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <PizzaModule
          v-else
          :pizzas="cart_store.getPizzas"
          @add-pizza="cart_store.pizza_add"
          @delete-pizza="cart_store.pizza_drop"
        />

        <MiscModule
          :miscs="miscs"
          @add-misc="cart_store.misc_add"
          @delete-misc="cart_store.misc_drop"
        />

        <AddressForm
          :options="selectList"
          :address-option="addressOption"
          :address="address"
          @set-address-option="setAddressOption"
          @set-address-info="setAddressInfo"
        />
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link class="button button--border button--arrow" to="/">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cart_store.fullCartPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          :disabled="
            !cart_store.pizzas.length ||
            (addressOption > 0 &&
              (address.street === '' || address.building === ''))
          "
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import {
  SectionTitle,
  PizzaModule,
  MiscModule,
  AddressForm,
} from "../common/components";
import { CartStore, ProfileStore, AuthStore, DataStore } from "../states_store";
import { useRouter } from "vue-router";

const router = useRouter();

const profile_store = ProfileStore();
const cart_store = CartStore();
const addressOption = ref(0);
const data_store = DataStore();
const auth_store = AuthStore();

const setAddressOption = (value) => {
  addressOption.value = value * 1;
  if (value > 1) {
    const list = profile_store.addresses.map((address) => address.name);
    const llist = ["Заберу сам", "Новый адрес", ...list];
    const name = llist[value];

    const addresss = profile_store.addresses.find(
      (address) => address.name === name
    );

    address.building = addresss.building;
    address.flat = addresss.flat;
    address.street = addresss.street;
  } else if (value === 0) {
    address.building = "";
    address.flat = "";
    address.street = "";
  }
};

const miscs = computed(() => {
  return data_store.misc;
});

const address = reactive({
  phone: "",
  street: "",
  building: "",
  flat: "",
});

const setAddressInfo = (category, value) => {
  console.log(category);
  address[category] = value;
};

const createOrder = () => {
  let orderAddress = "";
  if (addressOption.value == 0) {
    orderAddress = "";
    address.building = "";
    address.flat = "";
    address.street = "";
  } else if (addressOption.value == 1) {
    profile_store.address_add({
      ...address,
      name: `Адрес № ${profile_store.addresses.length + 1}`,
      userId: auth_store.user.id,
      street: address.street,
      building: address.building,
      flat: address.flat,
      comment: "",
    });
    orderAddress = Object.values(address).join(", ");
  } else {
    orderAddress = profile_store.addresses[0].orderAddress;
  }
  const order = {
    orderPizzas: cart_store.pizzas,
    orderMisc: cart_store.misc,
    orderAddress: orderAddress,
    price: cart_store.fullCartPrice,
    userId: auth_store.user.id,
    pizzas: cart_store.getFilteredPizzas,
    misc: cart_store.getFilteredMiscs,
    address: {
      street: address?.street || "Заберу сам",
      building: address?.building || "Заберу сам",
      flat: address?.flat || "Заберу сам",
      comment: "",
    },
    phone: address.phone,
  };
  profile_store.order_add(order);

  addressOption.value = 1;
  cart_store.clean();
  router.push("/success");
};

const selectList = computed(() => {
  const list = profile_store.addresses.map((address) => address.name);
  return ["Заберу сам", "Новый адрес", ...list];
});
</script>
