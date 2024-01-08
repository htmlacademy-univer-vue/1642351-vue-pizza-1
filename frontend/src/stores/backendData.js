import { defineStore } from "pinia";

export const useBackendDataStore = defineStore("backendData", {
  state: () => ({
    ingridients: {},
    sauces: {},
    sizes: {},
    dough: {},
  }),
  getters: {},
  actions: {
    getIngridiens() {
      return fetch("api/ingredients")
        .then((res) => res.json())
        .then((el) => (this.ingridients = el));
    },
    getSauces() {
      return fetch("api/sauces")
        .then((res) => res.json())
        .then((el) => (this.sauces = el));
    },
    getSizes() {
      return fetch("api/sizes")
        .then((res) => {
          return res.json();
        })
        .then((el) => {
          this.sizes = el;
        });
    },
    getDough() {
      return fetch("api/dough")
        .then((res) => {
          return res.json();
        })
        .then((el) => {
          this.dough = el;
        });
    },
  },
});
