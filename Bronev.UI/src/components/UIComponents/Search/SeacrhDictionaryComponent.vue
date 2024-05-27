<template>
  <div class="search">
    <div class="search-header">
      <ButtonBaseComponent
        v-for="(button, key) in buttonsAdd"
        :key="key"
        :class="button.class"
      >
        <template #buttonContent>
          <img
            v-if="button.icon"
            :src="button.icon"
            :alt="button.alt"
          >
          <span v-else>
            {{ button.text }}
          </span>
        </template>
      </ButtonBaseComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import PlusIcon from "@/assets/SvgImages/plus.svg";

const buttonsAdd = [
  { class: "search-header-button-plus", icon: PlusIcon, alt: "plus", text: "" },
  { class: "search-header-button-add", icon: "" , alt: "", text: "Добавить" }
]
</script>