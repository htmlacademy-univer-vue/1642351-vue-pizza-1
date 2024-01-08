<template>
    <Header />
    <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">

          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label class="dough__input dough__input--light">
                <input
                  type="radio"
                  name="dought"
                  value="small"
                  class="visually-hidden"
                  checked
                  v-model="doughtCheck"
                  >
                <b>Тонкое</b>
                <span>Из твердых сортов пшеницы</span>
              </label>

              <label class="dough__input dough__input--large">
                <input
                 type="radio"
                 name="dought" value="big" class="visually-hidden" v-model="doughtCheck">
                <b>Толстое</b>
                <span>Из твердых сортов пшеницы</span>
              </label>
            </div>
          </div>

        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label class="diameter__input diameter__input--small">
                <input type="radio" name="diameter" value="small" class="visually-hidden" v-model="diameterCheck">
                <span>23 см</span>
              </label>
              <label class="diameter__input diameter__input--normal">
                <input type="radio" name="diameter" value="normal" class="visually-hidden" checked v-model="diameterCheck">
                <span>32 см</span>
              </label>
              <label class="diameter__input diameter__input--big">
                <input type="radio" name="diameter" value="big" class="visually-hidden" v-model="diameterCheck">
                <span>45 см</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label class="radio ingredients__input">
                  <input type="radio" name="sauce" value="tomato" checked v-model="sauceCheck">
                  <span>Томатный</span>
                </label>
                <label class="radio ingredients__input">
                  <input type="radio" name="sauce" value="creamy" v-model="sauceCheck">
                  <span>Сливочный</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li class="ingredients__item" v-for="ingridient of ingredientss">
                    <span class="filling" :style="`--my-src: url('${'api'+ingridient.image}')`">
                     {{ingridient.name}}
                    </span>
                    <HomeButtonBar :value="ingredientsList[enums[ingridient.name]]" :ingridient="enums[ingridient.name]" @updateIngridient="updateIngridient"/>
                  </li>
                </ul>

              </div>

            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы" :value="pizza.name" @keyup="handleInputTitle">
          </label>

          <div class="content__constructor">
            <div :class="'pizza pizza--foundation--' + doughtCheck + '-' + sauceCheck">
              <div class="pizza__wrapper">
                <div :class="'pizza__filling pizza__filling--' + ingridient + ' pizza__filling--' + count" v-for="{ingridient,count } of pizzaProps"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="isDisableButtonCook" v-on:click="handelAddToCart">Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<style>
.filling::before{
  background-image: var(--my-src);
}
</style>

<script>
import HomeButtonBar from '../common/components/HomeButtonBar.vue'
import Header from '../common/components/Header.vue'
import { useBackendDataStore } from '../stores/backendData'
import router from "../router";

const store = useBackendDataStore()

export default {
  data() {
    return {
      doughtCheck: "big",
      diameterCheck: "normal",
      sauceCheck: "tomato",
      ingredientsList: {
        mushrooms: 0,
        cheddar: 0,
        salami: 0,
        ham: 0,
        ananas: 0,
        bacon: 0,
        onion: 0,
        chile: 0,
        jalapeno: 0,
        olives: 0,
        tomatoes: 0,
        salmon: 0,
        mozzarella: 0,
        parmesan: 0,
        blue_cheese: 0
      },
      pizzaProps: [],
      isDisableButtonCook : true,
      pizza:{
        name: "",
      },
      ingredientss:[],
      enums: {
        'Грибы': 'mushrooms',
        'Чеддер': 'cheddar',
        'Салями': 'salami',
        'Ветчина': 'ham',
        'Ананас': 'ananas',
        'Бекон': 'bacon',
        'Лук':'onion',
        'Чили':'chile',
        'Халапенью':'jalapeno',
        'Маслины':'olives',
        'Томаты':'tomatoes',
        'Лосось':'salmon',
        'Моцарелла':'mozzarella',
        'Пармезан':'parmesan',
        'Блю чиз':'blue_cheese'
      },
      price: 0

    };
  },
  components: {
    HomeButtonBar,
    Header
  },
    
 async created(){
    await store.getIngridiens()
    await store.getSauces()
    await store.getSizes()
    await store.getDough()
    this.ingredientss = store.ingridients
  },
  
  methods:{
    updateIngridient(ingridient, value){
      this.ingredientsList[ingridient] = value
    },
    updatePizzaWrapper(){
      this.pizzaProps = [];
      [...Object.keys(this.ingredientsList)].map((key)=>{
        if (this.ingredientsList[key] === 0) return
        if(this.ingredientsList[key] === 1) this.pizzaProps.push({ingridient: key, count: '', addCount: 1})
        if(this.ingredientsList[key] === 2) this.pizzaProps.push({ingridient: key, count: 'second', addCount: 2})
        if(this.ingredientsList[key] === 3) this.pizzaProps.push({ingridient: key, count: 'third',  addCount: 3})
      })
    },
    handleInputTitle(event){
      this.pizza.name = event.target.value
    },
    handleDisableButtonCook() {
      ([...Object.values(this.ingredientsList)].includes(1) || 
      [...Object.values(this.ingredientsList)].includes(2) ||
      [...Object.values(this.ingredientsList)].includes(3)) && this.pizza.name.length ? this.isDisableButtonCook = false : this.isDisableButtonCook = true
    },
    makePrice (){
      let multiplier = store.sizes.find((el)=>{
        if(this.diameterCheck === 'small' && el.name === '23 см') return true
        if(this.diameterCheck === 'normal' && el.name === '32 см') return true
        if(this.diameterCheck === 'big' && el.name === '45 см') return true
      }).multiplier
      let soucePrice = store.sauces.find((el)=>{
        if(this.sauceCheck === 'tomato' && el.name === "Томатный") return true
        if(this.sauceCheck === 'creamy' && el.name === "Сливочный") return true
      }).price
      let doughtPrice = store.dough.find((el)=>{ if(this.doughtCheck==='big') {
       return el.name==='Толстое'
      }else if(this.doughtCheck==='small'){
        return el.name==='Тонкое'
      } return false}).price
      let ingridientsPrice = store.ingridients.reduce((acc,cur)=>{
        const countIngridient = this.ingredientsList[this.enums[cur.name]]
        if(countIngridient) return countIngridient * cur.price + acc
        return acc
      },0)

      this.price = multiplier*(soucePrice+doughtPrice+ingridientsPrice)
    },
    handelAddToCart(){
      router.push('/cart')
    }
  },
  watch: {
    doughtCheck: {
      handler(){
        this.makePrice()
      },
      deep: true
    },
    diameterCheck: {
      handler(){
        this.makePrice()
      },
      deep: true
    },
    sauceCheck: {
      handler(){
        this.makePrice()
      },
      deep: true
    },
    ingredientsList:{
      handler(){
        this.updatePizzaWrapper()
        this.handleDisableButtonCook()
        this.makePrice()
      },
      deep: true
      },
    pizza:{
      handler(){
        this.handleDisableButtonCook()
      },
      deep: true
    }
  }
};
</script>