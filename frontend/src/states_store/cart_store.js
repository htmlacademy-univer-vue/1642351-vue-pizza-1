import { defineStore } from "pinia";

export const CartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {},
    pizzas: [],
    misc: [],
  }),
  getters: {
    fullCartPrice: (state) => {
      const pizzasPrice =
        state.pizzas.reduce(
          (sum, pizza) => sum + pizza.price * pizza.quantity,
          0
        ) ?? 0;
      const miscPrice =
        state.misc.reduce((sum, el) => sum + el.price * el.quantity, 0) ?? 0;
      return pizzasPrice + miscPrice;
    },
    getPhone: (state) => {
      return state.phone;
    },
    getAddress: (state) => {
      return state.address;
    },
    getPizzas: (state) => {
      return state.pizzas;
    },
    getMisc: (state) => {
      return state.misc;
    },
    getFilteredPizzas: (state) => {
      let filtered = [];
      let ingredients = [];

      state.pizzas.map((pizza) => {
        pizza.ingredients.map((ingredient) =>
          ingredients.push({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
          })
        );
        filtered.push({
          name: pizza.name,
          quantity: pizza.quantity,
          ingredients: ingredients,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
        });
      });
      return filtered;
    },
    getFilteredMiscs: (state) => {
      let filtered = [];

      state.misc.map((misc) => {
        filtered.push({
          miscId: misc.id,
          quantity: misc.quantity,
        });
      });
      return filtered;
    },
  },
  actions: {
    pizza_add(pizza) {
      const have = this.pizzas.find((item) => item.id === pizza.id);
      if (have) {
        have.quantity = have.quantity + 1;
      } else {
        this.pizzas.push({ ...pizza, quantity: 1 });
      }
    },
    pizza_edit(created_pizza) {
      const index = this.pizzas.findIndex(
        (pizza) => pizza.id === created_pizza.id
      );
      const have =
        this.pizzas.find((item) => item?.id === created_pizza?.id) ?? -1;
      this.pizzas.splice(index, 1, {
        ...created_pizza,
        quantity: have.quantity,
      });
    },
    pizza_drop(id) {
      const have = this.pizzas.find((item) => item.id === id);
      if (have.quantity === 1) {
        this.pizzas = this.pizzas.filter((pizza) => pizza.id !== id);
      } else {
        have.quantity = have.quantity - 1;
      }
    },
    misc_add(misc_created) {
      const have = this.misc.find((item) => item.id === misc_created.id);
      if (have) {
        have.quantity = have.quantity + 1;
      } else {
        this.misc.push({ ...misc_created, quantity: 1 });
      }
    },
    misc_drop(misc) {
      const have = this.misc.find((item) => item.id === misc.id);
      have.quantity = have.quantity - 1;
      if (have.quantity === 0) {
        this.misc = this.misc.filter((misc) => misc.id !== have.id);
      }
    },
    clean() {
      this.pizzas = [];
      this.misc = [];
    },
    miscs_set(miscs) {
      this.misc = miscs;
    },
  },
});
