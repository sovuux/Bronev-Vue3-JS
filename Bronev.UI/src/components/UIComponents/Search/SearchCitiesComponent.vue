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

const name = ref("")
const shortName = ref("")
const okato = ref("")
const oktmo = ref("")

const searchParam = {
  paramName: "name",
  paramShortName: "shortName",
  paramOkato: "okato",
  paramOktmo: "oktmo"
}

const getInputText = (value) => {
  name.value = value
  shortName.value = value
  okato.value = value
  oktmo.value = value
}

const startSearch = () => {
  if (name.value.length > 0) {
    store.searchTableCities(searchParam.paramName, name.value)
  }
  else if (shortName.value.length > 0) {
    store.searchTableCities(searchParam.paramShortName, shortName.value)
  }
  else if (okato.value.length > 0) {
    store.searchTableCities(searchParam.paramOkato, okato.value)
  }
  else if (oktmo.value.length > 0) {
    store.searchTableCities(searchParam.paramOktmo, oktmo.value)
  }
  else if (name.value.length > 0 && shortName.value.length > 0 && okato.value.length > 0  && oktmo.value.length > 0) {
    console.log("все ипуты введены")
  }
  else {
    console.log("пустые инпуты")
  }
}

const denySearch = () => {
  name.value = ""
  shortName.value = ""
  okato.value = ""
  oktmo.value = ""
  store.getTableCities()
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
      width: 22%;
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