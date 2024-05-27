<template>
  <div class="page">
    <div class="page-body">
      <div
        class="page-body-content"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Водители
          </span>
        </div>
        <div class="page-body-data">
          <div class="page-body-data-search">
            <SearchDriversComponent :inputs-array="searchInputsArray" />
          </div>
          <div class="page-body-data-table">
            <TableDictionary
              :objects-array="drivers"
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
    :popup-name="'Карта водителя'"
    @close-popup-card="togglePopupCard"
  />
</template>

<script setup>
import SearchDriversComponent from "@/components/UIComponents/Search/SearchDriversComponent.vue";
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";
import TableDictionary from "@/components/UIComponents/Tables/TableDictionary.vue";

const store = useStore()
const drivers = ref([])
const isPopupCardOpen = ref(false)

const searchInputsArray = [
  { placeholder: "Поиск по имени", type: "text" },
  { placeholder: "Поиск по фамилии", type: "text" },
  { placeholder: "Поиск по отчеству", type: "text" }
]

const popupColumns = [
  { key: "lastname", label: "Фамилия:" },
  { key: "firstname", label: "Имя:" },
  { key: "patronymic", label: "Отчество:" },
  { key: "birthDate", label: "Дата рождения" },
  { key: "sex", label: "Пол" },
  { key: "active", label: "Активность" },
]
const tableColumns = [
  { key: "lastname", content: "Фамилия" },
  { key: "firstname", content: "Имя" },
  { key: "patronymic", content: "Отчество" },
  { key: "birthDate", content: "Дата рождения" },
  { key: "sex", content: "Пол" },
  { key: "active", content: "Активность" },
]

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value
}

watch(() => store.drivers, (newValue) => {
  drivers.value = newValue
})

onMounted(async () => {
  await store.getTableDrivers()
})
</script>