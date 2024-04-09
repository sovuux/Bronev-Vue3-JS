<template>
  <div
    class="dropdown-wrapper"
    @click="toggleDropdown"
  >
    <div class="dropdown-wrapper-selected">
      <img
        :src="BookIcon"
        class="dropdown-wrapper-selected-logo"
        alt="book"
      >
      <span class="dropdown-wrapper-selected-span">
        {{ props.dropdownName }}
      </span>
      <img 
        :src="Arrow" 
        alt="arrow"
        class="dropdown-wrapper-selected-arrow"
      >
    </div>
  </div>
  <div
    v-if="isDropdownVisible"
    class="dropdown-options"
  >
    <ButtonBaseComponent
      v-for="(option, index) in props.options"
      :key="index"
      class="dropdown-options-items"
    >
      <template #buttonContent>
        <router-link
          :to="option.path"
          class="dropdown-options-items-router"
        >
          <img
            :src="option.icon"
            alt="icon"
          >
          <a class="dropdown-options-items-span">
            {{ option.content }}
          </a>
        </router-link>
      </template>
    </ButtonBaseComponent>
  </div>
</template>

<script setup>
import BookIcon from "@/assets/SvgImages/book-half.svg"
import Arrow from "@/assets/SvgImages/arrowShort.svg";
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  dropdownName: {
    type: String,
    default: ""
  }
})

const isDropdownVisible = ref(false)

const toggleDropdown = () => {
   isDropdownVisible.value = !isDropdownVisible.value
}
</script>

<style scoped lang="scss">
.dropdown {
  &-wrapper {
    display: grid;
    user-select: none;
    padding: 1rem;
    cursor: pointer;
    max-width: 200px;
    margin: 0 auto;

    &-selected {
      display: flex;
      border-radius: 8px;
      box-sizing: border-box;

      &-arrow {
        margin-left: 5%;
        width: 19px;
        height: 16px;
        transform: rotate(90deg);
      }

      &-span {
        padding-left: 5%;
        color: #000;
      }
    }
  }
  &-options {
    display: grid;
    align-items: center;
    justify-content: center;

    &-items {
      display: flex;
      padding: 1rem;
      box-sizing: border-box;
      border: none;
      color: black;
      transition: 0.4s ease-out;


      &:hover {
        color: rgb(96, 153, 9);
        border-radius: 0;
        border-bottom: 1px solid black;
        background: none;
        box-shadow: none;
      }

      &-router {
        text-decoration: none;
      }

      &-span {
        margin-left: 1rem;
        color: black;
        transition: 0.4s ease-out;

        &:hover {
          color: rgb(96, 153, 9);
          border-radius: 0;
          background: none;
          box-shadow: none;
        }
      }
    }
  }
}
</style>