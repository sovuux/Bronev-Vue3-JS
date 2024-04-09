<template>
  <aside
    class="aside"
    :class="`${props.isExpanded && 'is-expanded'}`"
  >
    <div
      class="aside-logo"
    >
      <img
        :src="props.logoSrc"
        alt="logo"
        class="aside-logo-img"
      >
    </div>
    <div
      v-if="props.isExpanded === false"
      class="aside-menu"
    >
      <div class="aside-menu-dropdown">
        <DropdownMenu
          :options="dropDownArrayShort"
        />
      </div>
      <ButtonBaseComponent
        v-for="button in buttonsArray"
        :key="button.icon"
        class="aside-menu-button"
      >
        <template #buttonContent>
          <img
            :src="button.icon"
            alt="logo"
            class="aside-menu-button-logo"
          >
        </template>
      </ButtonBaseComponent>
    </div>
    <div
      v-if="props.isExpanded"
      class="aside-menu"
    >
      <div class="aside-menu-dropdown">
        <DropdownMenu
          :options="dropDownArrayExpanded"
          :dropdown-name="'Справочники'"
        />
      </div>
      <ButtonBaseComponent
        v-for="button in buttonsArray"
        :key="button.icon"
        class="aside-menu-button"
      >
        <template #buttonContent>
          <img
            :src="button.icon"
            alt="logo"
            class="aside-menu-button-logo"
          >
          <span class="aside-menu-button-text">
            {{ button.content }}
          </span>
        </template>
      </ButtonBaseComponent>
    </div>
  </aside>
</template>

<script setup>
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import DropdownMenu from "@/components/UIComponents/DropdownMenu/DropdownMenu.vue";
import PercentIcon from "@/assets/SvgImages/percent.svg"
import PersonIcon from "@/assets/SvgImages/person-circle.svg"
import CartIcon from "@/assets/SvgImages/cart.svg"
import GeoPointIcon from "@/assets/SvgImages/geo-alt-fill.svg"
import TruckIcon from "@/assets/SvgImages/truck.svg"
import TextFileIcon from "@/assets/SvgImages/file-text-fill.svg"
import QuestionIcon from "@/assets/SvgImages/question-circle-fill.svg"
import CarIcon from "@/assets/SvgImages/car.svg"
import SignPostIcon from "@/assets/SvgImages/signpost.svg"
import { ref } from "vue";

const props = defineProps({
  logoSrc: {
    type: String,
    default: "https://pluspng.com/img-png/autodesk-logo-png-autodesk-unveils-complete-manufacturing-software-portfolio-tct-magazine-2272.png"
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const buttonsArray = [
  { icon: PercentIcon, content: "Скидки",  click: "", },
  { icon: PersonIcon, content: "Пользователи", click: "" },
  { icon: CartIcon, content: "Заказы", click: "" },
  { icon: GeoPointIcon, content: "Маршруты", click: "" },
  { icon: TruckIcon, content: "Рейсы", click: "" },
  { icon: TextFileIcon, content: "Отчёты", click: "" },
  { icon: QuestionIcon, content: "Помощь", click: "" }
]

const dropDownArrayExpanded = ref([
  { content: "Водители", icon: CarIcon, path: "/drivers"  },
  { content: "Направления", icon: SignPostIcon, path: "/routes" }
])
const dropDownArrayShort = ref([
  { icon: CarIcon, path: "/drivers" },
  { icon: SignPostIcon, path: "/routes" }
])
</script>

<style lang="scss" scoped>
.aside {
  display: flex;
  flex-direction: column;

  background-color: white;
  color: #99abb4;

  overflow: hidden;
  min-height: 100vh;
  height: 100%;
  width: 6rem;
  max-width: 15rem;
  z-index: 99;

  transition: 0.4s ease-out;

  &.is-expanded {
    width: 263px;
  }

  &-logo {
    background: url("@/assets/img/user-info.jpg") no-repeat;
    height: 9rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    &-img {

      width: 4rem;
      height: 4rem;
      background-color: white;
      border-radius: 80%;
    }
  }


  &-menu {
    display: grid;
    justify-content: center;

    &-dropdown {
      justify-items: center;
      align-items: center;
      cursor: pointer;
      padding: 16px;

      &:hover{
        border: 1px solid black;
        border-radius: 5px;
        background: none;
        color: gray;
        -webkit-box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        -moz-box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
      }
    }

    &-button {
      display: flex;
      align-items: center;
      padding: 1rem;
      border: none;
      color: black;
      transition: 0.4s ease-out;

      &:hover {
        border: 1px solid black;
        background: none;
        color: rgb(96, 153, 9);
      }

      &-logo {
        padding: 1rem;
      }
    }
  }
}
</style>