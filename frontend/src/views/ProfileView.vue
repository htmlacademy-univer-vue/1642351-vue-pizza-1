<template>
  <Header />
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <a href="index.html" class="logo layout__logo">
        <img src="src/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>

      <a class="layout__link" href="#">История заказов</a>
      <a class="layout__link layout__link--active" href="#">Мои данные</a>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <source type="image/webp" :srcset="'api'+whoAmI.avatar">
          <img :src="'api'+whoAmI.avatar" :srcset="'api'+whoAmI.avatar" :alt="whoAmI.data" width="72" height="72">
        </picture>
        <div class="user__name">
          <span>{{ whoAmI.name }}</span>
        </div>
        <p class="user__phone">Контактный телефон: <span>{{ whoAmI.phone }}</span></p>
      </div>

      <Adress v-for="address of adressess" :data="address" :userId="whoAmI.id" @updateAdress="updateAdresses"/>

     <AddAdress v-if="isAddAdress" :userId="whoAmI.id" @updateAdress="updateAdresses"/>
      <div class="layout__button">
        <button type="button" class="button button--border" v-on:click="toggleAddForm">Добавить новый адрес</button>
      </div>
    </div>
  </main>
</template>

<script>

import Header from '../common/components/Header.vue'
import AddAdress from '../common/components/AddAdress.vue'
import Adress from '../common/components/Adress.vue'

import router from "../router"
import { useAuthStore } from '../stores/auth'
const store = useAuthStore()

export default {
  data(){
    return {
      isAddAdress: false,
      whoAmI:{},
      adressess: []
    }
  },
  created(){
        if (!store.auth) {
          router.push('/')
        }
        this.whoAmI = store.whoAmIData

        fetch('api/addresses',{
          headers: {
          Authorization: `Bearer ${store.auth}`,
        },
        }).then((el)=>el.json()).then((el)=>{
          this.adressess = el
        })
    },
  components:{
    Header,
    AddAdress,
    Adress
  },
  methods:{
      toggleAddForm(){
          this.isAddAdress ? this.isAddAdress = false : this.isAddAdress = true
      },
      updateAdresses(){
        fetch('api/addresses',{
          headers: {
          Authorization: `Bearer ${store.auth}`,
        },
        }).then((el)=>el.json()).then((el)=>{
          this.adressess = el
        })
      }
   }
}
</script>