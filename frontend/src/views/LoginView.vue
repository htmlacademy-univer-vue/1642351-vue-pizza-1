<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <SectionTitle size="small">Авторизуйтесь на сайте</SectionTitle>
    </div>
    <form action="test.html" method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="user.email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="user.password"
            type="password"
            name="pass"
            placeholder="***********"
            required
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { SectionTitle } from "../common/components";
import { AuthStore } from "../states_store/";
import { reactive } from "vue";

const auth_store = AuthStore();
const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});

const login = async () => {
  const res = await auth_store.login(user);
  if (res === "success") {
    await auth_store.whoAmI();
    router.push("/user/profile");
  } else {
    alert(res);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
