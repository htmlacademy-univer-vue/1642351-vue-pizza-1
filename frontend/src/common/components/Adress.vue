<template>
    <div class="layout__address">
        <div class="sheet address-form">
          <div class="address-form__header">
            <b>{{data.name}}</b>
            <div class="address-form__edit">
              <button type="button" class="icon" v-on:click="togglePatchForm"><span class="visually-hidden">Изменить адрес</span></button>
            </div>
          </div>
          <p>{{ data.street }}, д. {{data.building}}, кв. {{data.flat}}</p>
          <small>{{ data.comment }}</small>
        </div>
      </div>
      <div class="layout__address" v-if="isPatch">
        <form action="test.html" method="post" class="address-form address-form--opened sheet"  @submit.prevent="submit">
          <div class="address-form__header">
            <b>{{data.name}}</b>
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
            <button type="button" class="button button--transparent" v-on:click="deleteAdress">Удалить</button>
            <button type="submit" class="button" v-on:click="patchAdress">Сохранить</button>
          </div>
        </form>
      </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'

export default {
    data(){
        return {
            isPatch: false,
            name: '',
            street: '',
            building: '',
            flat: '',
            comment: '',
            auth: ''        
        }
    },

    emits: ["updateAdress"],
    props:{
        data :{
            required: true
        },
        userId:{
            required: true
        }
    },
    created(){
        const store = useAuthStore()
        this.auth = store.auth  
    },
    methods:{
        togglePatchForm(){
            this.isPatch ? this.isPatch = false : this.isPatch = true
        },
        patchAdress(){
            if(this.name && this.street && this.building){
                fetch(`api/addresses/${this.data.id}`,{
                method: "PUT",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Bearer ${this.auth}`,
                },
                body: JSON.stringify({
                    id: this.data.id,
                    name: this.name,
                    street: this.street,
                    building: this.building,
                    flat: this.flat,
                    comment: this.comment,
                    userId: this.userId
                })  
                })
            .then((el)=>{this.$emit("updateAdress")})
            }
        },
        deleteAdress(){
            fetch(`api/addresses/${this.data.id}`,{
            method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": `Bearer ${this.auth}`,
            }
            })  
            .then((el)=>this.$emit("updateAdress"))
        }
    }

}
</script>