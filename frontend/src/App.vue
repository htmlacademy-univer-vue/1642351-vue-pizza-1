<template>
  <app-layout>
    <router-view v-slot="{ Component, route }">
      <transition name="slide">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { DataStore, AuthStore } from "./states_store";
const data_store = DataStore();
const auth_store = AuthStore();
data_store.fetchdata();
auth_store.whoAmI();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

.slide-enter-active {
  transition: all 0.4s;
}

.slide-enter {
  opacity: 0;
  margin-left: 90px;
}

.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
