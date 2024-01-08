import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: {
      //title:{
      // price: 0
      // quantity: 1
      // }
    },
    misc: {
      // price: 0
      // quantity: 1
    },
  }),
  getters: {},
  actions: {
    addPizza(pizz) {},
    addMisc(misc) {},
    totalPrice() {
      let sumPizzas = [...Object.values(this.pizzas)].reduce((acc, cur) => {
        return cur.price * quantity + acc;
      }, 0);
      let sumMisc = [...Object.values(this.misc)].reduce((acc, cur) => {
        return cur.price * quantity + acc;
      }, 0);
      return sumPizzas + sumMisc;
    },
  },
});
