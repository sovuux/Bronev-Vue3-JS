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
              :objects-array="routesFormatted"
              :table-columns="tableColumns"
              :total-items-in-array="routesCount"
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
import {computed, onMounted, ref, watch} from "vue";
import { useStore } from "@/stores/store.js";

const store = useStore()
const isPopupCardOpen = ref(false)
const routes = ref([])
const routesCount = ref(0)

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

function formatActive(active) {
  return active === true ? "Доступен" : "Не доступен";
}

const routesFormatted = computed(() => {
  return routes.value.map(route => {
    return {
      ...route,
      active: formatActive(route.active)
    }
  })
})

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value
}

watch(() => store.routesCount, (newValue) => {
  routesCount.value = newValue
})

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