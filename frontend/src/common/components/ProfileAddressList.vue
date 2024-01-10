<template>
  <div class="layout__address">
    <div
      v-for="address in addresses"
      :key="address.id"
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{ address?.id || "" }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="emits('openForm', 'edit', address)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.street }}, {{ address.building }}, {{ address.flat }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  addresses: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["openForm"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
