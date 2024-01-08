<template>
  <Header />
 <main class="layout">
    <div class="layout__sidebar sidebar">
      <a href="#" class="logo layout__logo" v-on:click="moveToHome">
        <img src="src/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>

      <a class="layout__link layout__link--active" href="#">История заказов</a>
      <a class="layout__link" href="#" v-on:click="moveToProfile">Мои данные</a>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <Order v-for="order of orders" :whoAmI="whoAmI" :order="order" @updateOrders="updateOrders"/>
    </div>
  </main>
</template>

<script>

import Header from '../common/components/Header.vue'
import Order from '../common/components/Order.vue'

import router from "../router"

import { useAuthStore } from '../stores/auth'
const storeAuth = useAuthStore()

export default {
  data(){
    return {
      whoAmI:{},
      orders: []
    }
  },
  components:{
    Header,
    Order
  },
  created(){
    if (!storeAuth.auth) {
          router.push('/')
        }
        this.whoAmI = storeAuth.whoAmIData

        fetch('api/orders',{
          headers: {
          Authorization: `Bearer ${storeAuth.auth}`,
        },
        }).then((el)=>el.json()).then((el)=>{
          this.orders = el
        })
  },
  methods:{
    moveToHome(){
        router.push('/')
      },
    moveToProfile(){
      router.push('/profile')
    },
    updateOrders(){
      fetch('api/orders',{
          headers: {
          Authorization: `Bearer ${storeAuth.auth}`,
        },
        }).then((el)=>el.json()).then((el)=>{
          this.orders = el
        })
    }
  }
}

</script>