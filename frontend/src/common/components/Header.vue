<template>
    <header class="header">
    <div class="header__logo">
      <a href="#" class="logo"  v-on:click="moveToHome">
        <img src="src/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>
    </div>
    <div class="header__cart">
      <a href="#" v-on:click="moveToCart">{{ cartValue }} ₽</a>
    </div>
    <div class="header__user">
      <a class="header__login" v-if="!isAuf" v-on:click="login" ><span >Войти</span></a>
      <a href="#" v-if="isAuf" v-on:click="moveToProfile">
        <picture>
          <source type="image/webp" :srcset="'/api'+whoAmI.avatar">
          <img :src="'/api'+whoAmI.avatar" :srcset="'/api'+whoAmI.avatar" :alt="whoAmI.name" width="32" height="32">
        </picture>
        <span>{{whoAmI.name}}</span>
      </a>
      <a href="#" class="header__logout" v-if="isAuf" v-on:click="logout"><span>Выйти</span></a>
    </div>
  </header>
</template>

<script>
import { watch } from "vue"
import router from "../../router"
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'

const store = useAuthStore()

export default {
    data(){
        return {
            isAuf: false,
            whoAmI: {},
            cartValue: 0
        }
    },
    async created(){
        if (store.auth) {
            this.isAuf = true
            await store.whoAmI()
            this.whoAmI = store.whoAmIData
        }
    },
    setup(){

        const cartStore = useCartStore()
        watch(()=>cartStore.pizzas, ()=>{
            this.cartValue = cartStore.totalPrice()
        })
        watch(()=>cartStore.misc, ()=>{
            this.cartValue = cartStore.totalPrice()
        })
    },
    methods:{
        login(){
            router.push('/login')
        },
        logout(){
            store.auth = ''
            this.isAuf = false
            router.push('/')
        },
        moveToHome(){
            router.push('/')
        },
        moveToProfile(){
            router.push('/profile')
        },
        moveToCart(){
            router.push('/cart')
        }
    }
}
</script>