<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="misc in miscs"
        :key="misc.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="getImageUrl(misc.image)"
            width="39"
            height="60"
            :alt="misc.name"
          />
          <span>{{ misc.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <AppCounter
            class="additional-list__counter"
            :count="misc.quantity"
            :orange="true"
            :max="10"
            @decrement="decrement(misc)"
            @increment="increment(misc)"
          />

          <div class="additional-list__price">
            <b>{{ misc.cost }}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getImageUrl } from "@/common/helpers";
import { AppCounter } from "../../common/components";
defineProps({
  miscs: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["addMisc", "deleteMisc"]);
const decrement = (misc) => {
  emits("deleteMisc", misc);
  misc.quantity = misc.quantity - 1;
};
const increment = (misc) => {
  emits("addMisc", misc);
  misc.quantity = misc.quantity + 1;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
