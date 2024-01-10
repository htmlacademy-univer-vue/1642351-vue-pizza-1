import { defineStore } from "pinia";

export const PizzaStore = defineStore("pizza", {
  state: () => ({
    id: 0,
    name: "",
    dough: {},
    size: {},
    sauce: {},
    ingredients: [],
  }),
  getters: {
    fullPizzaPrice: (state) => {
      const ingredientsTotalPrice = state.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price * ingredient.quantity,
        0
      );

      const mlt = state?.size?.multiplier ?? 1;
      return (
        mlt * (state.sauce.price + state.dough.price + ingredientsTotalPrice)
      );
    },
    getDough: (state) => {
      return state.dough;
    },
    getSize: (state) => {
      return state.size;
    },
    getSauce: (state) => {
      return state.sauce;
    },
    getIngredients: (state) => {
      return state.ingredients;
    },
    getIngredientsStr: (state) => {
      return state.ingredients
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ");
    },
    getPizzaInfo: (state) => {
      return {
        id: state.id,
        name: state.name,
        dough: state.dough,
        size: state.size,
        sauce: state.sauce,
        ingredients: state.ingredients,
        price: state.fullPizzaPrice,
        ingredientsStr: state.getIngredientsStr,
      };
    },
  },
  actions: {
    ing_add(ing_created) {
      const have = this.ingredients.find((item) => item.id === ing_created.id);
      if (have) {
        have.quantity += 1;
      } else {
        this.ingredients.push({ ...ing_created, quantity: 1 });
      }
    },

    pizzaState_set(pizza) {
      this.id = pizza.id;
      this.name = pizza.name;
      this.dough = pizza.dough;
      this.size = pizza.size;
      this.sauce = pizza.sauce;
      this.ingredients = pizza.ingredients;
    },
    upgradeIngredientCount(ingredient, count) {
      const have =
        this.ingredients.find((item) => item?.id === ingredient?.id) ?? -1;
      if (have === -1) {
        this.ingredients.push({ ...ingredient, quantity: count });
      } else {
        have.quantity = count;
        if (have.quantity === 0) {
          this.ingredients = this.ingredients.filter(
            (ingredient) => ingredient.id !== have.id
          );
        }
      }
    },
  },
});
