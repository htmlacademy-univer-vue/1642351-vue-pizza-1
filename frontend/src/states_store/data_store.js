import { defineStore } from "pinia";
import resources from "../services/resources";

import {
  normalizeDough,
  normalizeIngredients,
  normalizeSizes,
  normalizeSauces,
  normalizeMisc,
} from "@/common/helpers";

export const DataStore = defineStore("data", {
  state: () => ({
    dough: [],
    ingredients: [],
    misc: [],
    sauce: [],
    sizes: [],
  }),
  getters: {
    getIngredients(state) {
      return state.ingredients;
    },
  },
  actions: {
    async fetchdata() {
      const dough_a = await resources.dough.getDoughs();
      if (dough_a.__state !== "success") {
        return;
      } else {
        const data = dough_a.data.slice(0, 2);
        this.dough = data.map((dough) => normalizeDough(dough));
      }

      const ingredient_a = await resources.ingredient.getIngredients();
      if (ingredient_a.__state !== "success") {
        return;
      } else {
        const data = ingredient_a.data.slice(0, 15);
        this.ingredients = data.map((ingredient) =>
          normalizeIngredients(ingredient)
        );
      }

      const misc_a = await resources.misc.getMiscs();
      if (misc_a.__state !== "success") {
        return;
      } else {
        const data = misc_a.data.slice(0, 3);
        this.misc = data.map((misc) => normalizeMisc(misc));
      }

      const sauce_a = await resources.sauce.getSauces();
      if (sauce_a.__state !== "success") {
        return;
      } else {
        const data = sauce_a.data.slice(0, 2);
        this.sauce = data.map((sauce) => normalizeSauces(sauce));
      }

      const resources_a = await resources.size.getSizes();
      if (resources_a.__state !== "success") {
        return;
      } else {
        const data = resources_a.data.slice(0, 3);
        this.sizes = data.map((size) => normalizeSizes(size));
      }
    },
  },
});
