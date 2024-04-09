<template>
  <header class="header">
    <div class="header-main">
      <router-link
        to="/home"
        class="header-img"
      >
        <img
          src="../../../assets/img/logo-light-icon.png"
          alt="logo"
          class="header-img"
        >
      </router-link>
      <ButtonBaseComponent
        class="header-list"
        @click-action="emit('openSidebar')"
      >
        <template #buttonContent>
          <img
            :src="ListIcon"
            alt="list"
            class="header-list-img"
          >
        </template>
      </ButtonBaseComponent>
      <router-link
        to="/home"
        class="header-router"
      >
        <ButtonBaseComponent class="header-main-text">
          <template #buttonContent>
            Продажи
          </template>
        </ButtonBaseComponent>
      </router-link>
      <router-link
        to="/routes"
        class="header-router"
      >
        <ButtonBaseComponent class="header-main-text">
          <template #buttonContent>
            Маршруты
          </template>
        </ButtonBaseComponent>
      </router-link>
      <router-link
        to="/report"
        class="header-router"
      >
        <ButtonBaseComponent class="header-main-text">
          <template #buttonContent>
            Отчёты
          </template>
        </ButtonBaseComponent>
      </router-link>
    </div>
    <div class="header-right">
      <img
        :src="props.logoSrc"
        alt="logo"
        class="header-img"
      >
    </div>
  </header>
</template>

<script setup>
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import ListIcon from '../../../assets/SvgImages/list.svg'

const emit = defineEmits(['openSidebar'])

const props = defineProps({
  logoSrc: {
    type: String,
    default: "https://pluspng.com/img-png/autodesk-logo-png-autodesk-unveils-complete-manufacturing-software-portfolio-tct-magazine-2272.png"
  }
})
</script>

<style lang="scss">
.header {
    width: 100%;
    height: auto;
    display: flex;
    background: black;

    &-main {
      margin-left: 1%;
      display: flex;
      width: 100%;
      align-items: center;

      &-text {
        color: white;
        background: black;
        border: none;

        &:hover {
          background: black;
          border: none;
          border-radius: 0;
          color: #c0bebe;
          transition: 0.3s ease-out;
          border-bottom: 1px solid white;
        }
      }
    }

    &-router {
      margin-left: 2%;
    }

    &-right {
      margin-right: 2%;
      display: flex;
      align-items: center;
    }

    &-list {
      margin-left: 10px;
      background: black;
      border: none;

      &:hover {
        background: black;
        border: none;
      }

      &-img {
        width: 30px;
        padding: 0;
        margin: 0;
      }
    }

    &-img {
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50px;
    }
}
</style>