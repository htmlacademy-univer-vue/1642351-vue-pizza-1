<template>
    <section class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: 1 564 ₽</span>
          </div>

          <div class="order__button">
            <button type="button" class="button button--border" v-on:click="deleteOrder">Удалить</button>
          </div>
          <div class="order__button">
            <button type="button" class="button" v-on:click="repeatOrder">Повторить</button>
          </div>
        </div>

        <ul class="order__list">
            <OrderPizza v-for="pizza of order.orderPizzas" :pizza="pizza"/>
        </ul>

        <ul class="order__additional">
            <OrderAdditional v-for="misc of order.orderMisc" :misc="misc"/>
        </ul>

        <p class="order__address">Адрес доставки: ул.{{order.orderAddress.street}} д.{{order.orderAddress.building}} кв.{{order.orderAddress.flat}} </p>
      </section>
</template>

<script>
import OrderPizza from './OrderPizza.vue'
import OrderAdditional from './OrderAdditional.vue'
import { useAuthStore } from '../../stores/auth'
export default {
    data(){
        return {
            auth: ''
        }
    },
    emits: ["updateOrders"],
    components:{
        OrderPizza,
        OrderAdditional
    },
    props:{
        order :{
            required: true
        },
        whoAmI :{
            required: true
        }
    },
    created(){
        const store = useAuthStore()
        this.auth = store.auth  

    },
    methods:{
        repeatOrder(){
          let prepareHeaderPizass = []
          for (const el of this.order.orderPizzas){
            prepareHeaderPizass.push({
                "name": el.name,
                "sauceId": el.sauceId,
                "doughId": el.doughId,
                "sizeId": el.sizeId,
                "quantity": el.quantity,
                "ingredients": el.ingredients.map((els)=>{return {ingredientId: els.ingredientId, quantity: els.quantity }})
            })
          }
          let orderMisc = []
          for (const el of this.order.orderMisc){
            orderMisc.push({
                "miscId": el.miscId,
                "quantity": el.quantity
               })
          }

                  fetch('api/orders',{
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${this.auth}`,
          },
          body: JSON.stringify({
            "userId": this.whoAmI.id,
            "phone": this.whoAmI.phone,
            "address": this.order.orderAddress,
            "pizzas": prepareHeaderPizass,
            "misc": orderMisc
                })  
        }).then((el)=>el.json()).then((el)=> this.$emit("updateOrders"))
        },
        deleteOrder(){
            fetch(`api/orders/${this.order.id}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${this.auth}`,
          },
        }).then(()=>this.$emit("updateOrders"))
        }
    }
}
</script>