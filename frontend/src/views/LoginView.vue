<script>
let isValid = {
    email: null,
    password: null
}
const pattern = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/

import { useAuthStore } from '../stores/auth'

import router from "../router";
 const store = useAuthStore()

export default {
    data: function() {
    return {
        errorMessage: ''
    }
  },
  methods: { 
    isValidPassword(event) {
      if (event.target.value.length > 0) {
        isValid.password = event.target.value}
       else {
        isValid.password = null
      }
    },
    isValidEmail(event){
        if (event.target.value.length > 0) {
            if (event.target.value.match(pattern))
                isValid.email = event.target.value
            else isValid.email = null}
       else {
        isValid.email = null
      }
    },
    async submit () {
        if (isValid.email && isValid.password){
            await store.login(isValid)
            if (store.errorMessage) {
                this.errorMessage = store.errorMessage
            } else {
                router.push('/')
            }
        } else {
            this.errorMessage = 'Логин и/или пароль невалидны'
        }
    },
    close(){
        router.push('/')
    }
  },
};

</script>

<template>
    <div class="sign-form">
        <a href="#" class="close close--white" v-on:click="close">
        <span class="visually-hidden">Закрыть форму авторизации</span>
        </a>
        <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
        </div>
        <form action="test.html" method="post" @submit.prevent="submit">
        <div class="sign-form__input">
            <label class="input">
            <span>E-mail</span>
            <input type="email" name="email" placeholder="example@mail.ru" @input="isValidEmail">
            </label>
        </div>

        <div class="sign-form__input">
            <label class="input">
                <span>Пароль</span>
                <input type="password" 
                name="pass" 
                placeholder="***********" 
                @input="isValidPassword">
            </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
        </form>
        <span>{{ errorMessage }}</span>
    </div>
</template>

