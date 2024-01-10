<template>
  <div class="layout__sidebar sidebar">
    <transition name="slide">
      <router-link to="/" class="logo layout__logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </transition>
    <transition name="slide">
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': $route.path === '/user/orders' }"
        to="/user/orders"
        >История заказов</router-link
      >
    </transition>

    <transition name="slide">
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': $route.path === '/user/profile' }"
        to="/user/profile"
        >Мои данные</router-link
      >
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";

.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}

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
