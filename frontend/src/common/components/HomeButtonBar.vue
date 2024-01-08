<script>
export default {
    data(){
        return {
            isPlusDisabled : true,
            isMinusDisabled : false
        }
    },
  props: {
    value: {
      required: true
    },
    ingridient:{
        required: true
    }
  },
  methods:{
    handleOnChange(event){
        if (Number(event.target.value) >= 3) {
            this.$emit("updateIngridient", this.ingridient, 3)

            this.isMinusDisabled = true
            this.isPlusDisabled = false
            return}
        if (Number(event.target.value) <= 0) {

            this.isMinusDisabled = false
            this.isPlusDisabled = true
            this.$emit("updateIngridient", this.ingridient, 0)
          return}

          this.isMinusDisabled = false
            this.isPlusDisabled = false
        this.$emit("updateIngridient", this.ingridient, event.target.value)
    },
    handlePlus(){
        if (Number(this.value) >= 2) {

            this.isMinusDisabled = true
            this.isPlusDisabled = false
            this.$emit("updateIngridient", this.ingridient, 3)
            return}

            this.isMinusDisabled = false
            this.isPlusDisabled = false
        this.$emit("updateIngridient", this.ingridient, Number(this.value) + 1)
    },
    handleMinus(){
        if (Number(this.value) <= 1) {
            this.isMinusDisabled = false
            this.isPlusDisabled = true
            this.$emit("updateIngridient", this.ingridient, 0)
            return}

            this.isMinusDisabled = false
            this.isPlusDisabled = false
        this.$emit("updateIngridient", this.ingridient, Number(this.value) - 1)
    },
  }
}

</script>
<template>
     <div class="counter counter--orange ingredients__counter">
        <button type="button" class="counter__button counter__button--minus" v-on:click="handleMinus" :disabled="isPlusDisabled">
        <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" :value="value" @keyup="handleOnChange">
        <button type="button" class="counter__button counter__button--plus" v-on:click="handlePlus" :disabled="isMinusDisabled">
        <span class="visually-hidden">Больше</span>
        </button>
    </div>
</template>