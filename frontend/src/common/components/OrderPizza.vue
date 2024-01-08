<template>
    <li class="order__item">
            <div class="product">
              <img src="src/assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
              <div class="product__text">
                <h2>{{pizza.name}}</h2>
                <p>
                    {{ sizes }}, на {{ dough }} тесте<br>
                  Соус: {{sauces}}<br>
                  Начинка: {{ingridients}}
                </p>
              </div>
            </div>

            <p class="order__price">782 ₽</p>
          </li>
</template>

<script>
import {useBackendDataStore} from '../../stores/backendData'

export default{
    data(){
        return {
            ingridients: '',
            dough: '',
            sauces: '',
            sizes: ''
        }

    },
    props:{
        pizza :{
            required: true
        },
    },
    created(){
        const store = useBackendDataStore()
        this.dough = store.dough.find((el)=> el.id === this.pizza.doughId).name
        this.sauces = store.sauces.find((el)=> el.id === this.pizza.sauceId).name
        this.sizes = store.sizes.find((el)=> el.id === this.pizza.sizeId).name
        this.ingridients = this.pizza.ingredients?.reduce((acc, cur)=>{
            return acc + ' ' + store.ingridients.find((el)=> el.id === cur.ingredientId).name+' x '+cur.quantity+' '
        }, '')

    },
}
</script>