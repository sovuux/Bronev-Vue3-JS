<template>
  <div class="page">
    <div class="page-body">
      <div
        class="page-body-content"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Список направлений
          </span>
        </div>
        <div class="page-body-data">
          <div class="page-body-data-search">
            <SearchRoutesComponent :inputs-array="searchInputsArray" />
          </div>
          <div class="page-body-data-table">
            <TableDictionary
              :objects-array="routes"
              :table-columns="tableColumns"
              @open-modal-card="togglePopupCard"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopupCard
    v-if="isPopupCardOpen"
    :form-columns="popupColumns"
    :popup-name="'Карта маршрута'"
    @close-popup-card="togglePopupCard"
  />
</template>
  
<script setup>
import SearchRoutesComponent from "@/components/UIComponents/Search/SearchRoutesComponent.vue";
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import TableDictionary from "@/components/UIComponents/Tables/TableDictionary.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";

const store = useStore()
const isPopupCardOpen = ref(false)
const routes = ref([])

const searchInputsArray = [
  { placeholder: "Поиск по наименованию", type: "text" },
  { placeholder: "Поиск по сокращению", type: "text" }
]

const popupColumns = [
  { key: "name", label: "Название:" },
  { key: "shortName", label: "Сокращение:" },
  { key: "active", label: "Доступность:" },
]

const tableColumns = ref([
  { key: "name", content: "Название" },
  { key: "shortName", content: "Сокращение" },
  { key: "active", content: "Доступность" },
])

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value
}

watch(() => store.routes, (newValue) => {
  routes.value = newValue
})

onMounted(async () => {
  await store.getTableRoutes()
})
</script>

<style scoped lang="scss">
.page-body-content{
  height: 100vh;
}
</style>