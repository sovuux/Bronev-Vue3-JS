<template>
  <div class="page">
    <HeaderPageElement
      v-if="!isLogin"
      class="page-header"
      @open-sidebar="toggleSideBar"
    />
    <div
      class="page-body"
      :class="{'login-page': isLogin}"
    >
      <SideBar
        v-if="!isLogin"
        class="page-body-sidebar"
        :is-expanded="isExpanded"
      />
      <div
        class="page-body-content"
        :class="{ 'login-page': isLogin }"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import HeaderPageElement from '@/components/UIComponents/Header/HeaderPageElement.vue';
import SideBar from '@/components/UIComponents/SideBar/SideBar.vue';
import { useRoute } from "vue-router";

const route = useRoute()

const isExpanded = ref(false)

const isLogin = computed(() => route.name === "Login")

const toggleSideBar = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  &-header {
    flex-shrink: 0;
    position: fixed;
    z-index: 9999;
  }
  &-body {
    display: flex;
    flex-grow: 1;
    padding-top: 1.9%;
    height: 90vh;

    &-sidebar {
      height: 100%;
    }

    &-content
    {
      background-color: #ddf0f7;
      height: 127vh;
      width: 100%;
      transition: 0.4s ease-out;
      margin-left: 0;
      &-title {
        background-color: white;
        align-items: center;
        padding: 1%;
        &-span {
          font-size: 25px;
          color: rgb(117, 126, 128);
          user-select: none;
          padding: 1%;
        }
      }
    }
    &-data {
      margin: 2%;
      width: 98%;
      background-color: white;
    }
  }
}
.login-page{
  height: 100vh;
  padding: 0;
}
</style>