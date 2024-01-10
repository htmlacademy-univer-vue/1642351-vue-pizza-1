<template>
  <div v-if="status" class="layout__address">
    <form
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="emits('save')"
    >
      <div class="address-form__header">
        <b>{{
          getIdAndName(addressParams?.id || "", addressParams?.name || "")
        }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              :value="addressParams.name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
              @input="emits('setAddressInfo', 'name', $event.target.value)"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              :value="addressParams.street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
              @input="emits('setAddressInfo', 'street', $event.target.value)"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              :value="addressParams.building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
              @input="emits('setAddressInfo', 'building', $event.target.value)"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              :value="addressParams.flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
              @input="emits('setAddressInfo', 'flat', $event.target.value)"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
              :value="addressParams.comment"
              @input="emits('setAddressInfo', 'comment', $event.target.value)"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          v-if="actionType == 'edit'"
          type="button"
          class="button button--transparent"
          @click="emits('delete')"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: Boolean,
    required: true,
  },
  addressParams: {
    type: Object,
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["save", "delete", "setAddressInfo"]);

const getIdAndName = (id, name) => {
  return `Адрес №${id}. ${name}`;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
