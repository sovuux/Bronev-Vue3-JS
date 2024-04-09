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

const props = defineProps({
  inputsArray: {
    type: Array,
    required: true
  }
})

const startSearch = () => {
  console.log("Start")
}

const denySearch = () => {
  console.log("Deny")
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
      width: 45%;
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