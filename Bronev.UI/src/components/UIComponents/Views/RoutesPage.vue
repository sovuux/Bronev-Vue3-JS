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
      <div
        class="page-body-content"
        :class="{'expanded-body': isExpanded}"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Список направлений
          </span>
        </div>
        <div class="page-body-data">
          <SearchComponent :inputs-array="searchInputsArray" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import HeaderPageElement from "@/components/UIComponents/Header/HeaderPageElement.vue";
  import SideBar from "@/components/UIComponents/SideBar/SideBar.vue";
  import SearchComponent from "@/components/UIComponents/Search/SearchComponent.vue";
  import { ref } from "vue";
  
  const isExpanded = ref(false)
  
  const toggleSideBar = () => {
    isExpanded.value = !isExpanded.value
  }

  const searchInputsArray = [
    { placeholder: "Поиск по наименованию", type: "text" },
    { placeholder: "Поиск по сокращению", type: "text" }
  ]
  </script>
  
  <style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
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
      padding-top: 3.5%;
      height: 100vh;
  
      &-sidebar {
        height: 100%;
      }
  
      &-content
      {
        background-color: #ddf0f7;
        height: 100%;
        width: 100%;
        transition: 0.4s ease-out;
        margin-left: 0;
        &-title {
          background-color: white;
          padding: 1%;
          &-span {
            font-size: 25px;
            color: rgb(117, 126, 128);
            user-select: none;
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