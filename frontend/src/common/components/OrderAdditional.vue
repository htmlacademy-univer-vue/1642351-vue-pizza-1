<template>
    <li>
            <img :src="image" width="20" height="30" :alt="name">
            <p>
              <span>{{name}}</span>
              <b>{{ price }} ₽</b>
            </p>
          </li>
</template>

<script>
import {useBackendDataStore} from '../../stores/backendData'

export default{
    data(){
        return {
            image: '',
            name: '',
            price: '',
        }

    },
    props:{
        misc :{
            required: true
        },
    },
    created(){
        const store = useBackendDataStore()
        const {name, price, image} = store.misc.find((el)=> el.id === this.misc.miscId)
        this.image = 'api'+image
        this.name = name
        this.price = price
    },
}
</script>