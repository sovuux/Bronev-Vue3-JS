<template>
  <PopupBaseComponent>
    <template #popupHeader>
      <ButtonBaseComponent
        class="popup-button-close"
        @click-action="emit('closePopupCard')"
      >
        <template #buttonContent>
          <img
            :src="CloseIcon"
            alt="close"
            class="popup-button-close-img"
          >
        </template>
      </ButtonBaseComponent>
      <div class="popup-header-title">
        <span class="popup-header-title-content">
          {{ props.popupName }}
        </span>
      </div>
    </template>
    <template #popupBody>
      <div
        v-for="(formColumn, index) in props.formColumns"
        :key="index"
        class="popup-body-content"
      >
        <span class="popup-body-content-label">
          {{ formColumn.label }}
        </span>
        <span class="popup-body-content-key">
          {{ store.cardObject[formColumn.key] }}
        </span>
      </div>
    </template>
  </PopupBaseComponent>
</template>

<script setup>
import PopupBaseComponent from "@/components/ BaseComponents/Popup/PopupBaseComponent.vue";
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import CloseIcon from "@/assets/SvgImages/close.svg"
import { useStore } from "@/stores/store.js";

const emit = defineEmits(["closePopupCard"]);

const props = defineProps({
  popupName: {
    type: String,
    default: "Popup",
    required: true
  },
  formColumns: {
    type: Array,
    default: null,
    required: true
  }
})

const store = useStore()
</script>

<style lang="scss" scoped>
.popup {
  &-button {
    &-close {
      border: none;
      background: none;
      padding: 0;
      margin: 0 0 0 92%;

      &:hover {
        border: none;
        box-shadow: none;
      }
      &-img {
        width: 50px;
        height: 50px;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
  &-header {
    &-title {
      padding-bottom: 1rem;
      font-size: 30px;
    }
  }
  &-body {
    &-content {
      font-size: 22px;
      width: 100%;
      border-bottom: 1px solid black;
      display: flex;
      align-items: center;
      text-align: right;

      &-label {
        padding: 2rem;
        width: 25%;
      }

      &-key {
        color: rgb(96, 153, 9);
      }
    }
  }
}
</style>