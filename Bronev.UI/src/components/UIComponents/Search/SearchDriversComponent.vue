<template>
  <div class="search">
    <div class="search-header">
      <ButtonBaseComponent class="search-header-button-plus">
        <template #buttonContent>
          <img
              :src="PlusIcon"
              alt="plus"
          >
        </template>
      </ButtonBaseComponent>
      <ButtonBaseComponent class="search-header-button-add">
        <template #buttonContent>
          <span>
            Добавить
          </span>
        </template>
      </ButtonBaseComponent>
    </div>
    <div class="search-body">
      <InputBaseComponent
          v-for="(input, index) in props.inputsArray"
          :key="index"
          :type="input.type"
          :placeholder="input.placeholder"
          class="search-body-input"
          @input-text-change="getInputText"
      />
    </div>
    <div class="search-footer">
      <ButtonBaseComponent
          v-for="(button, index) in buttonFooterArray"
          :key="index"
          :class="button.class"
          @click-action="button.action"
      >
        <template #buttonContent>
          <span>
            {{ button.content }}
          </span>
        </template>
      </ButtonBaseComponent>
    </div>
  </div>
</template>

<script setup>
import InputBaseComponent from '@/components/ BaseComponents/Input/InputBaseComponent.vue';
import ButtonBaseComponent from '@/components/ BaseComponents/Button/ButtonBaseComponent.vue';

import PlusIcon from "@/assets/SvgImages/plus.svg"
import { ref } from "vue";
import { useStore } from "@/stores/store.js";

const props = defineProps({
  inputsArray: {
    type: Array,
    required: true
  }
})

const store = useStore()

const firstName = ref("")
const lastName = ref("")
const patronymic = ref("")

const searchParam = {
  paramFirstName: "firstname",
  paramLastName: "lastname",
  paramPatronymic: "patronymic"
}

const getInputText = (value) => {
  firstName.value = value
  lastName.value = value
  patronymic.value = value
}

const startSearch = () => {
  if (firstName.value.length > 0) {
    store.searchTableDrivers(searchParam.paramFirstName, firstName.value)
    console.log(searchParam.paramFirstName)
  }
  else if (lastName.value.length > 0) {
    store.searchTableDrivers(searchParam.paramLastName, lastName.value)
    console.log(searchParam.paramLastName)
  }
  else if (patronymic.value.length > 0) {
    store.searchTableDrivers(searchParam.paramPatronymic, patronymic.value)
    console.log(searchParam.paramPatronymic)
  }
  else if (firstName.value.length > 0 && lastName.value.length > 0 && patronymic.value.length > 0) {
    console.log("все инпуты введены")
  }
  else {
    console.log("пустые инпуты")
  }
}

const denySearch = () => {
  firstName.value = ""
  lastName.value = ""
  patronymic.value = ""
  store.getTableDrivers()
}

const buttonFooterArray = [
  { content: "Поиск", action: startSearch, class: "search-footer-button-search" },
  { content: "Отмена", action: denySearch, class: "search-footer-button-deny" }
]
</script>

<style lang="scss" scoped>
.search {
  &-header {
    padding: 1rem;
    display: flex;
    &-button {
      &-plus {
        padding: 10px;
        background-color: #6c6c6c;
        border: none;
        border-radius: 5px 0 0 5px;
        &:hover {
          background-color: #6c6c6c;
          opacity: 0.9;
        }
      }
      &-add {
        background-color: gray;
        border: none;
        border-radius: 0 5px 5px 0;
        color: #fff;
        &:hover {
          color: whitesmoke;
          background-color: #6c6c6c;
          opacity: 0.9;
        }
      }
    }
  }
  &-body {
    &-input {
      padding: 0.5rem;
      margin: 1rem;
      width: 30%;
      font-size: 1.2rem;
    }
  }
  &-footer {
    padding: 1rem;

    &-button {
      &-search {
        color: rgb(96, 153, 9);
        border: 2px solid rgb(96, 153, 9);
        padding: 1.2rem;
        width: 10%;

        &:hover {
          background-color: rgb(96, 153, 9);
          color: white;
        }
      }
      &-deny {
        margin-left: 3%;
        padding: 1.2rem;
        width: 10%;
        color: #ff8181;
        border: 2px solid #ff8181;

        &:hover {
          background-color: #ff8181;
          color: white;
        }
      }
    }
  }
}
</style>