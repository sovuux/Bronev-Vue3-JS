<template>
  <div class="page">
    <div class="page-body">
      <div
        class="page-body-content"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Пассажиры
          </span>
        </div>
        <div class="page-body-data">
          <div class="page-body-data-search">
            <SearchPeopleComponent :inputs-array="searchInputsArray" />
          </div>
          <div class="page-body-data-table">
            <TableDictionary
              :objects-array="peopleFormatted"
              :table-columns="tableColumns"
              :total-items-in-array="peopleCount"
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
    :popup-name="'Карта пассажира'"
    @close-popup-card="togglePopupCard"
  />
</template>

<script setup>
import SearchPeopleComponent from "@/components/UIComponents/Search/SearchPeopleComponent.vue";
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import TableDictionary from "@/components/UIComponents/Tables/TableDictionary.vue";
import {computed, onMounted, ref, watch} from "vue";
import { useStore } from "@/stores/store.js";


const store = useStore()
const isPopupCardOpen = ref(false)
const people = ref([])
const peopleCount = ref(0)

const searchInputsArray = [
  { placeholder: "Поиск по фамилии", type: "text" },
  { placeholder: "Поиск по имени", type: "text" },
  { placeholder: "Поиск по отчеству", type: "text" },
  { placeholder: "Поиск по телефону", type: "text" }
]

const popupColumns = [
  { key: "lastname", label: "Фамилия:" },
  { key: "firstname", label: "Имя:" },
  { key: "patronymic", label: "Отчество:" },
  { key: "documents", label: "Паспорт:" },
  { key: "phone", label: "Телефон:" },
]

const tableColumns = ref([
  { key: "lastname", content: "Фамилия" },
  { key: "firstname", content: "Имя" },
  { key: "patronymic", content: "Отчество" },
  { key: "documents", content: "Паспорт" },
  { key: "phone", content: "Телефон" },
])

function formatPassport(documents) {
  if (documents) {
    return `${documents[0].serial} ` + `${documents[0].number}`;
  }
}

const peopleFormatted = computed(() => {
  return people.value.map(person => {
    return {
      ...person,
      documents: formatPassport(person.documents)
    }
  })
})

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value
}

watch(() => store.peopleCount, (newValue) => {
  peopleCount.value = newValue
})

watch(() => store.people, (newValue) => {
  people.value = newValue
})

onMounted( async () => {
  await store.getTablePeople()
})
</script>