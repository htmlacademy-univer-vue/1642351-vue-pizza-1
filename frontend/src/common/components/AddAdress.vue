<template>
     <div class="layout__address">
        <form class="address-form address-form--opened sheet" @submit.prevent="submit" v-on:click="addAdress">
          <div class="address-form__header">
            <b>Адрес</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input type="text" name="addr-name" placeholder="Введите название адреса" required @input="name = $event.target.value">
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input type="text" name="addr-street" placeholder="Введите название улицы" required @input="street = $event.target.value">
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input type="text" name="addr-house" placeholder="Введите номер дома" required @input="building = $event.target.value">
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input type="text" name="addr-apartment" placeholder="Введите № квартиры" @input="flat = $event.target.value">
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input type="text" name="addr-comment" placeholder="Введите комментарий" @input="comment = $event.target.value">
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button type="submit" class="button">Сохранить</button>
          </div>
        </form>
      </div>

</template>

<script>
import { useAuthStore } from '../../stores/auth'

export default{
  data(){
    return{
      name: '',
      street: '',
      building: '',
      flat: '',
      comment: '',
      auth: ''
    }
  },
  created(){
    const store = useAuthStore()
    this.auth = store.auth
  },
  props:{
    userId:{
      required: true
    }
  },
  methods:{
    addAdress(){
      if(this.name && this.street && this.building){
        fetch('api/addresses',{
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${this.auth}`,
        },
        body: JSON.stringify({
          name: this.name,
          street: this.street,
          building: this.building,
          flat: this.flat,
          comment: this.comment,
          userId: this.userId
        })  
        })
        .then((res)=> res.json())
        .then((el)=>this.$emit("updateAdress"))
      }
    }
  }
}
</script>