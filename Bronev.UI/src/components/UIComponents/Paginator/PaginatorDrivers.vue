<template>
  <div class="paginator">
    <ButtonBaseComponent
      class="paginator-arrow"
      @click-action="goToPreviousPage"
    >
      <template #buttonContent>
        <img
            :src="ArrowLeftIcon"
            alt="arrow-left"
            class="paginator-arrow-icon"
        />
      </template>
    </ButtonBaseComponent>
    <ButtonBaseComponent
      v-for="(page, pageIndex) in pages"
      :key="pageIndex"
      @click-action="getCurrentPage(page)"
      class="paginator-button"
    >
      <template #buttonContent>
        <span class="paginator-button-content">
          {{ page }}
        </span>
      </template>
    </ButtonBaseComponent>
    <ButtonBaseComponent
      class="paginator-arrow"
      @click-action="goToNextPage"
    >
      <template #buttonContent>
        <img
            :src="ArrowRightIcon"
            alt="arrow-right"
            class="paginator-arrow-icon"
        />
      </template>
    </ButtonBaseComponent>
  </div>
</template>

<script setup>
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import { computed, ref, watch } from "vue";
import ArrowLeftIcon from "@/assets/SvgImages/arrowLeft.svg"
import ArrowRightIcon from "@/assets/SvgImages/arrowRight.svg"
import { useStore } from "@/stores/store.js";

const store = useStore()

const pages = ref(0)
const pageSize = ref(10)
const currentPage = ref(0)

const getCurrentPage = (num) => {
  currentPage.value = (Number(num) - 1) * pageSize.value
}

const goToNextPage = () => {
  console.log(store.driversOnPage)
}

const goToPreviousPage = () => {

}

const pageToggle = (object) => {
  let index = pageSize.value
  if (store.driversOnPage.length > 0) {
    index = Number(currentPage.value) + pageSize.value
  }
  store.driversOnPage.value = object.slice(currentPage.value, index)
}

const pageCount = (count, start) => {
  pages.value = Number(count) / Number(start)
}

computed(() => {
  return store.driversOnPage
})

watch(() => store.driversCount, (countObjects) => {
  store.driversCount = countObjects
  pageCount(store.drivers)
  pageCount(countObjects, pageSize.value)
})

watch(() => currentPage.value, () => {
  pageToggle(store.drivers)
})
</script>