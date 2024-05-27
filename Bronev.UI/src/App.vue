<template>
  <div class="page">
    <HeaderPageElement
      class="page-header"
      @open-sidebar="toggleSideBar"
    />
    <div class="page-body">
      <SideBar
        class="page-body-sidebar"
        :is-expanded="isExpanded"
      />
      <router-view
        class="page-body-content"
        :class="{'expanded-body': isExpanded}"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderPageElement from '@/components/UIComponents/Header/HeaderPageElement.vue';
import SideBar from '@/components/UIComponents/SideBar/SideBar.vue';

const isExpanded = ref(false)

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
.expanded-body{
  transition: 0.4s ease-out;
}
</style>