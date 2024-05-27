<template>
  <div class="page">
    <div class="page-body">
      <div
        class="page-body-content"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Города
          </span>
        </div>
        <div class="page-body-data">
          <div class="page-body-data-search">
            <SearchCitiesComponent :inputs-array="searchInputsArray" />
          </div>
          <div class="page-body-data-table">
            <TableCities @open-popup-card="togglePopupCard" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopupCard
    v-if="isPopupCardOpen"
    :form-columns="popupColumns"
    :popup-name="'Карта города'"
    @close-popup-card="togglePopupCard"
  />
</template>

<script setup>
import SearchCitiesComponent from "@/components/UIComponents/Search/SearchCitiesComponent.vue";
import TableCities from "@/components/UIComponents/Tables/TableCities.vue";
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import { ref } from "vue";

const isPopupCardOpen = ref(false)

const searchInputsArray = [
  { placeholder: "Поиск по наименованию", type: "text" },
  { placeholder: "Поиск по сокращению", type: "text" },
  { placeholder: "Поиск по ОКАТО", type: "text" },
  { placeholder: "Поиск по ОКТМО", type: "text" },
]

const popupColumns = [
  { key: "shortName", label: "Сокращение:" },
  { key: "name", label: "Название:" },
  { key: "officialName", label: "Оффициальное название:" },
  { key: "okato", label: "ОКАТО" },
  { key: "oktmo", label: "ОКТМО:" },
  { key: "longtitude", label: "Долгота:" },
  { key: "latitude", label: "Широта:" }
]

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value
}
</script>
